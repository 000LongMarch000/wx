/*jslint nomen: true*/

/*global define, $, _, Backbone, Handlebars, plupload*/

define(function (require, exports, module) {
  'use strict';

  var app, config, setup, templates, newInstance, model, collection, view, templatesRequired;

  require('./fn.js');

  config = require('./config.js');

  templatesRequired = {
    api: {
      filter: config.api.filter,
      catalog: config.api.catalog,
      uploader: config.api.uploader
    },
    app: require('./tpls/app.tpl'),
    memory: {
      images: require('./tpls/memory/images.tpl'),
      products: require('./tpls/memory/products.tpl'),
      pages: require('./tpls/memory/pages.tpl'),
      events: require('./tpls/memory/events.tpl'),
      coupons: require('./tpls/memory/coupons.tpl'),
      populars: require('./tpls/memory/populars.tpl'),
      tags_group: require('./tpls/memory/tags_group.tpl')
    },
    pagination: require('./tpls/pagination.tpl'),
    paginationSelect: require('./tpls/pagination-select.tpl'),
    catalog: {
      images: require('./tpls/catalog/images.tpl'),
      products: require('./tpls/catalog/products.tpl'),
      pages: require('./tpls/catalog/pages.tpl'),
      events: require('./tpls/catalog/events.tpl'),
      coupons: require('./tpls/catalog/coupons.tpl'),
      populars: require('./tpls/catalog/populars.tpl'),
      tags_group: require('./tpls/catalog/tags_group.tpl')
    },
    categories: require('./tpls/categories.tpl'),
    filters: {
      tag: require('./tpls/filters/tag.tpl'),
      search: require('./tpls/filters/search.tpl'),
      eventtype: require('./tpls/filters/eventtype.tpl')
    }
  };

  function compileTemplates(obj, fn, root) {
    var node = root;
    _.each(obj, function (v, key) {
      if (_.isObject(v)) {
        if (!node[key]) {
          node[key] = {};
        }
        compileTemplates(v, fn, node[key]);
      } else {
        node[key] = fn(v);
      }
    });
  }

  templates = {};
  compileTemplates(templatesRequired, Handlebars.compile, templates);

  newInstance = function () {
    model = collection = undefined;
    model = {
      categories: new Backbone.Model(),
      pagination: new Backbone.Model(),
      catalog: new Backbone.Model(),
      filters: {
        tag: new Backbone.Model(),
        search: new Backbone.Model(),
        eventtype: new Backbone.Model()
      }
    };
    collection = {
      memory: new Backbone.Collection(),
      catalog: new Backbone.Collection()
    };
  };

  view = {
    memory: Backbone.View.extend({
      events: {
        'click button': 'clearMemory'
      },
      initialize: function () {
        this.listenTo(collection.memory, 'add', this.render);
        this.listenTo(collection.memory, 'remove', this.render);
        this.listenTo(collection.memory, 'reset', this.render);
      },
      render: function () {
        this.$el.html(templates.memory[setup.type]({count: collection.memory.length}));
      },
      clearMemory: function (e) {
        var $el = $(e.currentTarget).closest('.selector-layout-main').find('.selector-catalog');
        $el.find('input').prop('checked', false).prop('disabled', false).closest('tr').removeClass('allChecked partialChecked');
        $el.find('a, tr').removeClass('checked disabled');
        collection.memory.reset();
      }
    }),
    pagination: Backbone.View.extend({
      events: {
        'click .selector-pagination-nav button, .selector-pagination-page-item button, .selector-pagination-select-item button': 'toPage',
        'click .selector-pagination-select button': 'selectPage'
      },
      initialize: function () {
        this.listenTo(model.pagination, 'change', this.render);
      },
      render: function () {
        var
          pages = model.pagination.get('pages'),
          page = model.pagination.get('page'),
          start = page > 3 ? (page + 2 > pages ? pages - 4 : page - 2) : 1,
          stop = start + 4 > pages ? pages + 1 : start + 5;

        if (!page || !pages) {
          return;
        }

        this.$el.html(templates.pagination({
          total: pages,
          pages: _.map(_.range(start, stop), function (num) {
            return {
              page: num,
              isCurrent: num === page
            };
          }),
          isFirst: page === 1,
          isLast: page === pages,
          isOverflowed: pages - 2 > page,
          isHuge: pages > 5
        }));
      },
      selectPage: function (e) {
        var
          $el = $(e.currentTarget),
          page = model.pagination.get('page'),
          pages = _.map(_.range(1, Number($el.val()) + 1), function (num) {
            return {
              page: num,
              isCurrent: num === page
            };
          });
        $el.prop('disabled', true).after(templates.paginationSelect({pages: pages}));
      },
      toPage: function (e) {
        var
          $el = $(e.currentTarget),
          $search = $el.closest('.selector-app').find('.selector-filters-search [name=query]'),
          page = Number($el.val()),
          constructor = config.constructor[setup.type],
          query;

        if ($search.length > 0 && $search.val().length > 0) {
          model.pagination.set({page: page}, {silent: true});
          query = model.filters.search.get('query');
          model.filters.search.set({query: ''}, {silent: true});
          model.filters.search.set('query', query);
          $el.prop('disabled', true).closest('.selector-pagination-page-item').siblings().find('button').prop('disabled', false);
        } else {
          model.pagination.set({page: page});
        }
        $el.closest('.selector-pagination-select').children('button').prop('disabled', false);
      }
    }),
    catalog: {
      images: Backbone.View.extend({
        events: {
          'click a': 'toggleCheck',
          'change input': 'changeMemory'
        },
        initialize: function () {
          this.listenTo(collection.catalog, 'reset', this.render);
        },
        render: function () {
          var data = [];

          _.each(collection.catalog.toJSON(), function (item) {
            var d = collection.memory.findWhere({id: item.id});
            data.push(_.extend(item, {isMemoried: !!d }));

            if (!!d) {
              d.set(item, { silent: true });
            }
          });

          this.$el.html(templates.catalog.images({data: data, isDisabled: setup.options.multiple && collection.memory.length >= setup.options.max}));
        },
        toggleCheck: function (e) {
          e.preventDefault();
          var $el = $('input', e.currentTarget);
          if ($el.closest('a').is('.disabled')) {
            $.notify('已达到最大选择数量');
          }
          if ($el.prop('disabled')) {
            return;
          }
          $el.prop('checked', !$el.prop('checked')).trigger('change');
        },
        changeMemory: function (e) {
          var
            $el = $(e.currentTarget),
            model = collection.catalog.findWhere({id: $el.val()});

          if ($el.is(':checked')) {
            $el.closest('a').addClass('checked');
          } else {
            $el.closest('a').removeClass('checked');
          }

          if ($el.is(':checked')) {
            if (setup.options.multiple) {
              collection.memory.add(model);
              if (setup.options.max >= 0 && collection.memory.length >= setup.options.max) {
                $el.closest('ul').find('a').filter(function () {
                  return $('input:not(:checked)', this).length > 0;
                }).addClass('disabled').find('input').prop('disabled', true);
              }
            } else {
              collection.memory.reset(model);
              $el.closest('li').siblings().find('a').filter(function () {
                return $('input:checked', this).length > 0;
              }).removeClass('checked').find('input').not($el).prop('checked', false);
            }
          } else {
            collection.memory.remove(model);
            if (setup.options.multiple) {
              $el.closest('ul').find('a.disabled').removeClass('disabled').find('input').prop('disabled', false);
            }
          }
        }
      }),
      products: Backbone.View.extend({
        events: {
          'click a': 'toggleCheck',
          'change input': 'changeMemory'
        },
        initialize: function () {
          this.listenTo(collection.catalog, 'reset', this.render);
        },
        render: function () {
          var
            data = _.map(collection.catalog.toJSON(), function (item) {
              return _.extend(item, {isMemoried: collection.memory.where({id: item.id}).length > 0});
            }),
            checkedLength = _.where(data, {isMemoried: true}).length;
          this.$el.html(templates.catalog.products({
            isMultiple: setup.options.multiple,
            data: data,
            isDisabled: setup.options.multiple && collection.memory.length >= setup.options.max,
            isPartialChecked: checkedLength > 0 && checkedLength < data.length,
            isAllChecked: checkedLength === data.length,
            isSearch: typeof model.filters.search.get('query') !== 'undefined' && model.filters.search.get('query').length > 0
          }));
        },
        toggleCheck: function (e) {
          e.preventDefault();
          var $el = $(e.currentTarget).closest('tr').find('input');
          if ($el.closest('tr').is('.disabled')) {
            $.notify('已达到最大选择数量');
          }
          if ($el.prop('disabled')) {
            return;
          }
          $el.prop('checked', !$el.prop('checked')).trigger('change');
        },
        changeMemory: function (e) {
          var
            $el = $(e.currentTarget),
            m = collection.catalog.findWhere({id: $el.val()});

          if ($el.is(':checked')) {
            $el.closest('tr').addClass('checked');
          } else {
            $el.closest('tr').removeClass('checked');
          }

          if (!setup.options.multiple) {
            if ($el.is(':checked')) {
              collection.memory.reset(m);
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:checked', this).length > 0;
              }).removeClass('checked').find('input').prop('checked', false);
            } else {
              collection.memory.reset();
              $el.closest('tr').removeClass('checked');
            }
            return;
          }

          if ($el.val() === 'all') {
            if ($el.is(':checked')) {
              $el.closest('table').find('tbody input:not(:checked)').slice(0, setup.options.max - collection.memory.length).prop('checked', true).trigger('change');
            } else {
              $el.closest('table').find('tbody input:checked').prop('checked', false).trigger('change');
            }
            return;
          }

          if ($el.is(':checked')) {
            collection.memory.add(m);
            if (setup.options.max >= 0 && collection.memory.length >= setup.options.max) {
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:not(:checked)', this).length > 0;
              }).addClass('disabled').find('input').prop('disabled', true);
            } else {
              $el.closest('tr').addClass('checked');
            }
          } else {
            collection.memory.remove(m);
            $el.closest('tr').removeClass('checked').siblings('.disabled').removeClass('disabled').find('input').prop('disabled', false);
          }

          if ($el.closest('tbody').find('input:not(:checked)').length === 0) {
            $el.closest('table').find('thead tr').removeClass('partialChecked').addClass('allChecked');
            return;
          }

          if ($el.closest('tbody').find('input:checked').length === 0) {
            $el.closest('table').find('thead tr').removeClass('allChecked partialChecked');
            return;
          }

          $el.closest('table').find('thead tr').removeClass('allChecked').addClass('partialChecked').find('input').prop('checked', true);
        }
      }),
      pages: Backbone.View.extend({
        events: {
          'click a': 'toggleCheck',
          'change input': 'changeMemory'
        },
        initialize: function () {
          this.listenTo(collection.catalog, 'reset', this.render);
        },
        render: function () {
          var
            data = _.map(collection.catalog.toJSON(), function (item) {
              return _.extend(item, {isMemoried: collection.memory.where({id: item.id}).length > 0});
            }),
            checkedLength = _.where(data, {isMemoried: true}).length;
          this.$el.html(templates.catalog.pages({
            isMultiple: setup.options.multiple,
            data: data,
            isDisabled: setup.options.multiple && collection.memory.length >= setup.options.max,
            isPartialChecked: checkedLength > 0 && checkedLength < data.length,
            isAllChecked: checkedLength === data.length
          }));
        },
        toggleCheck: function (e) {
          e.preventDefault();
          var $el = $(e.currentTarget).closest('tr').find('input');
          if ($el.closest('tr').is('.disabled')) {
            $.notify('已达到最大选择数量');
          }
          if ($el.prop('disabled')) {
            return;
          }
          $el.prop('checked', !$el.prop('checked')).trigger('change');
        },
        changeMemory: function (e) {
          var
            $el = $(e.currentTarget),
            m = collection.catalog.findWhere({id: $el.val()});

          if ($el.is(':checked')) {
            $el.closest('tr').addClass('checked');
          } else {
            $el.closest('tr').removeClass('checked');
          }

          if (!setup.options.multiple) {
            if ($el.is(':checked')) {
              collection.memory.reset(m);
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:checked', this).length > 0;
              }).removeClass('checked').find('input').prop('checked', false);
            } else {
              collection.memory.reset();
              $el.closest('tr').removeClass('checked');
            }
            return;
          }

          if ($el.val() === 'all') {
            if ($el.is(':checked')) {
              $el.closest('table').find('tbody input:not(:checked)').slice(0, setup.options.max - collection.memory.length).prop('checked', true).trigger('change');
            } else {
              $el.closest('table').find('tbody input:checked').prop('checked', false).trigger('change');
            }
            return;
          }

          if ($el.is(':checked')) {
            collection.memory.add(m);
            if (setup.options.max >= 0 && collection.memory.length >= setup.options.max) {
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:not(:checked)', this).length > 0;
              }).addClass('disabled').find('input').prop('disabled', true);
            } else {
              $el.closest('tr').addClass('checked');
            }
          } else {
            collection.memory.remove(m);
            $el.closest('tr').removeClass('checked').siblings('.disabled').removeClass('disabled').find('input').prop('disabled', false);
          }

          if ($el.closest('tbody').find('input:not(:checked)').length === 0) {
            $el.closest('table').find('thead tr').removeClass('partialChecked').addClass('allChecked');
            return;
          }

          if ($el.closest('tbody').find('input:checked').length === 0) {
            $el.closest('table').find('thead tr').removeClass('allChecked partialChecked');
            return;
          }

          $el.closest('table').find('thead tr').removeClass('allChecked').addClass('partialChecked').find('input').prop('checked', true);
        }
      }),
      events: Backbone.View.extend({
        events: {
          'click a': 'toggleCheck',
          'change input': 'changeMemory'
        },
        initialize: function () {
          this.listenTo(collection.catalog, 'reset', this.render);
        },
        render: function () {
          var
            data = _.map(collection.catalog.toJSON(), function (item) {
              return _.extend(item, {isMemoried: collection.memory.where({id: item.id}).length > 0});
            }),
            checkedLength = _.where(data, {isMemoried: true}).length;
          this.$el.html(templates.catalog.events({
            isMultiple: setup.options.multiple,
            data: data,
            isDisabled: setup.options.multiple && collection.memory.length >= setup.options.max,
            isPartialChecked: checkedLength > 0 && checkedLength < data.length,
            isAllChecked: checkedLength === data.length
          }));
        },
        toggleCheck: function (e) {
          e.preventDefault();
          var $el = $(e.currentTarget).closest('tr').find('input');
          if ($el.closest('tr').is('.disabled')) {
            $.notify('已达到最大选择数量');
          }
          if ($el.prop('disabled')) {
            return;
          }
          $el.prop('checked', !$el.prop('checked')).trigger('change');
        },
        changeMemory: function (e) {
          var
            $el = $(e.currentTarget),
            m = collection.catalog.findWhere({id: $el.val()});

          if ($el.is(':checked')) {
            $el.closest('tr').addClass('checked');
          } else {
            $el.closest('tr').removeClass('checked');
          }

          if (!setup.options.multiple) {
            if ($el.is(':checked')) {
              collection.memory.reset(m);
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:checked', this).length > 0;
              }).removeClass('checked').find('input').prop('checked', false);
            } else {
              collection.memory.reset();
              $el.closest('tr').removeClass('checked');
            }
            return;
          }

          if ($el.val() === 'all') {
            if ($el.is(':checked')) {
              $el.closest('table').find('tbody input:not(:checked)').slice(0, setup.options.max - collection.memory.length).prop('checked', true).trigger('change');
            } else {
              $el.closest('table').find('tbody input:checked').prop('checked', false).trigger('change');
            }
            return;
          }

          if ($el.is(':checked')) {
            collection.memory.add(m);
            if (setup.options.max >= 0 && collection.memory.length >= setup.options.max) {
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:not(:checked)', this).length > 0;
              }).addClass('disabled').find('input').prop('disabled', true);
            } else {
              $el.closest('tr').addClass('checked');
            }
          } else {
            collection.memory.remove(m);
            $el.closest('tr').removeClass('checked').siblings('.disabled').removeClass('disabled').find('input').prop('disabled', false);
          }

          if ($el.closest('tbody').find('input:not(:checked)').length === 0) {
            $el.closest('table').find('thead tr').removeClass('partialChecked').addClass('allChecked');
            return;
          }

          if ($el.closest('tbody').find('input:checked').length === 0) {
            $el.closest('table').find('thead tr').removeClass('allChecked partialChecked');
            return;
          }

          $el.closest('table').find('thead tr').removeClass('allChecked').addClass('partialChecked').find('input').prop('checked', true);
        }
      }),
      coupons: Backbone.View.extend({
        events: {
          'click a': 'toggleCheck',
          'change input': 'changeMemory'
        },
        initialize: function () {
          this.listenTo(collection.catalog, 'reset', this.render);
        },
        render: function () {
          var
            data = _.map(collection.catalog.toJSON(), function (item) {
              return _.extend(item, {isMemoried: collection.memory.where({id: item.id}).length > 0});
            }),
            checkedLength = _.where(data, {isMemoried: true}).length;
          this.$el.html(templates.catalog.coupons({
            isMultiple: setup.options.multiple,
            data: data,
            isDisabled: setup.options.multiple && collection.memory.length >= setup.options.max,
            isPartialChecked: checkedLength > 0 && checkedLength < data.length,
            isAllChecked: checkedLength === data.length
          }));
        },
        toggleCheck: function (e) {
          e.preventDefault();
          var $el = $(e.currentTarget).closest('tr').find('input');
          if ($el.closest('tr').is('.disabled')) {
            $.notify('已达到最大选择数量');
          }
          if ($el.prop('disabled')) {
            return;
          }
          $el.prop('checked', !$el.prop('checked')).trigger('change');
        },
        changeMemory: function (e) {
          var
            $el = $(e.currentTarget),
            m = collection.catalog.findWhere({id: $el.val()});

          if ($el.is(':checked')) {
            $el.closest('tr').addClass('checked');
          } else {
            $el.closest('tr').removeClass('checked');
          }

          if (!setup.options.multiple) {
            if ($el.is(':checked')) {
              collection.memory.reset(m);
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:checked', this).length > 0;
              }).removeClass('checked').find('input').prop('checked', false);
            } else {
              collection.memory.reset();
              $el.closest('tr').removeClass('checked');
            }
            return;
          }

          if ($el.val() === 'all') {
            if ($el.is(':checked')) {
              $el.closest('table').find('tbody input:not(:checked)').slice(0, setup.options.max - collection.memory.length).prop('checked', true).trigger('change');
            } else {
              $el.closest('table').find('tbody input:checked').prop('checked', false).trigger('change');
            }
            return;
          }

          if ($el.is(':checked')) {
            collection.memory.add(m);
            if (setup.options.max >= 0 && collection.memory.length >= setup.options.max) {
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:not(:checked)', this).length > 0;
              }).addClass('disabled').find('input').prop('disabled', true);
            } else {
              $el.closest('tr').addClass('checked');
            }
          } else {
            collection.memory.remove(m);
            $el.closest('tr').removeClass('checked').siblings('.disabled').removeClass('disabled').find('input').prop('disabled', false);
          }

          if ($el.closest('tbody').find('input:not(:checked)').length === 0) {
            $el.closest('table').find('thead tr').removeClass('partialChecked').addClass('allChecked');
            return;
          }

          if ($el.closest('tbody').find('input:checked').length === 0) {
            $el.closest('table').find('thead tr').removeClass('allChecked partialChecked');
            return;
          }

          $el.closest('table').find('thead tr').removeClass('allChecked').addClass('partialChecked').find('input').prop('checked', true);
        }
      }),
      populars: Backbone.View.extend({
        events: {
          'click a': 'toggleCheck',
          'change input': 'changeMemory'
        },
        initialize: function () {
          this.listenTo(collection.catalog, 'reset', this.render);
        },
        render: function () {
          var
            data = _.map(collection.catalog.toJSON(), function (item) {
              return _.extend(item, {isMemoried: collection.memory.where({id: item.id}).length > 0});
            }),
            checkedLength = _.where(data, {isMemoried: true}).length;
          this.$el.html(templates.catalog.populars({
            isMultiple: setup.options.multiple,
            data: data,
            isDisabled: setup.options.multiple && collection.memory.length >= setup.options.max,
            isPartialChecked: checkedLength > 0 && checkedLength < data.length,
            isAllChecked: checkedLength === data.length
          }));
        },
        toggleCheck: function (e) {
          e.preventDefault();
          var $el = $(e.currentTarget).closest('tr').find('input');
          if ($el.closest('tr').is('.disabled')) {
            $.notify('已达到最大选择数量');
          }
          if ($el.prop('disabled')) {
            return;
          }
          $el.prop('checked', !$el.prop('checked')).trigger('change');
        },
        changeMemory: function (e) {
          var
            $el = $(e.currentTarget),
            m = collection.catalog.findWhere({id: $el.val()});

          if ($el.is(':checked')) {
            $el.closest('tr').addClass('checked');
          } else {
            $el.closest('tr').removeClass('checked');
          }

          if (!setup.options.multiple) {
            if ($el.is(':checked')) {
              collection.memory.reset(m);
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:checked', this).length > 0;
              }).removeClass('checked').find('input').prop('checked', false);
            } else {
              collection.memory.reset();
              $el.closest('tr').removeClass('checked');
            }
            return;
          }

          if ($el.val() === 'all') {
            if ($el.is(':checked')) {
              $el.closest('table').find('tbody input:not(:checked)').slice(0, setup.options.max - collection.memory.length).prop('checked', true).trigger('change');
            } else {
              $el.closest('table').find('tbody input:checked').prop('checked', false).trigger('change');
            }
            return;
          }

          if ($el.is(':checked')) {
            collection.memory.add(m);
            if (setup.options.max >= 0 && collection.memory.length >= setup.options.max) {
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:not(:checked)', this).length > 0;
              }).addClass('disabled').find('input').prop('disabled', true);
            } else {
              $el.closest('tr').addClass('checked');
            }
          } else {
            collection.memory.remove(m);
            $el.closest('tr').removeClass('checked').siblings('.disabled').removeClass('disabled').find('input').prop('disabled', false);
          }

          if ($el.closest('tbody').find('input:not(:checked)').length === 0) {
            $el.closest('table').find('thead tr').removeClass('partialChecked').addClass('allChecked');
            return;
          }

          if ($el.closest('tbody').find('input:checked').length === 0) {
            $el.closest('table').find('thead tr').removeClass('allChecked partialChecked');
            return;
          }

          $el.closest('table').find('thead tr').removeClass('allChecked').addClass('partialChecked').find('input').prop('checked', true);
        }
      }),
      tags_group: Backbone.View.extend({
        events: {
          'click a': 'toggleCheck',
          'change input': 'changeMemory'
        },
        initialize: function () {
          this.listenTo(collection.catalog, 'reset', this.render);
        },
        render: function () {
          var
            data = _.map(collection.catalog.toJSON(), function (item) {
              return _.extend(item, {isMemoried: collection.memory.where({id: item.id}).length > 0});
            }),
            checkedLength = _.where(data, {isMemoried: true}).length;
          this.$el.html(templates.catalog.tags_group({
            isMultiple: setup.options.multiple,
            data: data,
            isDisabled: setup.options.multiple && collection.memory.length >= setup.options.max,
            isPartialChecked: checkedLength > 0 && checkedLength < data.length,
            isAllChecked: checkedLength === data.length
          }));
        },
        toggleCheck: function (e) {
          e.preventDefault();
          var $el = $(e.currentTarget).closest('tr').find('input');
          if ($el.closest('tr').is('.disabled')) {
            $.notify('已达到最大选择数量');
          }
          if ($el.prop('disabled')) {
            return;
          }
          $el.prop('checked', !$el.prop('checked')).trigger('change');
        },
        changeMemory: function (e) {
          var
            $el = $(e.currentTarget),
            m = collection.catalog.findWhere({id: $el.val()});

          if ($el.is(':checked')) {
            $el.closest('tr').addClass('checked');
          } else {
            $el.closest('tr').removeClass('checked');
          }

          if (!setup.options.multiple) {
            if ($el.is(':checked')) {
              collection.memory.reset(m);
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:checked', this).length > 0;
              }).removeClass('checked').find('input').prop('checked', false);
            } else {
              collection.memory.reset();
              $el.closest('tr').removeClass('checked');
            }
            return;
          }

          if ($el.val() === 'all') {
            if ($el.is(':checked')) {
              $el.closest('table').find('tbody input:not(:checked)').slice(0, setup.options.max - collection.memory.length).prop('checked', true).trigger('change');
            } else {
              $el.closest('table').find('tbody input:checked').prop('checked', false).trigger('change');
            }
            return;
          }

          if ($el.is(':checked')) {
            collection.memory.add(m);
            if (setup.options.max >= 0 && collection.memory.length >= setup.options.max) {
              $el.closest('tr').addClass('checked').siblings().filter(function () {
                return $('input:not(:checked)', this).length > 0;
              }).addClass('disabled').find('input').prop('disabled', true);
            } else {
              $el.closest('tr').addClass('checked');
            }
          } else {
            collection.memory.remove(m);
            $el.closest('tr').removeClass('checked').siblings('.disabled').removeClass('disabled').find('input').prop('disabled', false);
          }

          if ($el.closest('tbody').find('input:not(:checked)').length === 0) {
            $el.closest('table').find('thead tr').removeClass('partialChecked').addClass('allChecked');
            return;
          }

          if ($el.closest('tbody').find('input:checked').length === 0) {
            $el.closest('table').find('thead tr').removeClass('allChecked partialChecked');
            return;
          }

          $el.closest('table').find('thead tr').removeClass('allChecked').addClass('partialChecked').find('input').prop('checked', true);
        }
      })
    },
    categories: Backbone.View.extend({
      initialize: function () {
        this.listenTo(model.categories, 'change:id', this.render);
      },
      render: function () {
        var
          constructor = config.constructor[setup.type],
          id = model.categories.get('id'),
          data = {
            name: constructor.categories.name,
            data: _.map(constructor.categories.data, function (item, index) {
              return _.extend(item, {isCurrent: id ? item.id === id : index === 0});
            })
          };
        this.$el.html(templates.categories(data));
      }
    }),
    filters: {
      tag: Backbone.View.extend({
        events: {
          'click button': 'toFilter'
        },
        initialize: function () {
          this.listenTo(model.filters.tag, 'change:data', this.render);
        },
        render: function () {
          this.$el.html(templates.filters.tag({
            name: config.constructor[setup.type].filters.tag,
            data: model.filters.tag.get('data')
          }));
        },
        toFilter: function (e) {
          var
            $el = $(e.currentTarget),
            $search = $el.closest('.selector-layout-main').find('.selector-filters-search');
          model.pagination.set({page: 0}, {silent: true});
          model.filters.tag.set({query: $el.val()});
          model.filters.search.set({
            filter: 'search',
            type: 'tag',
            query: $el.val()
          }, {silent: true});
          $el.prop('disabled', true).closest('li').siblings().find('button').prop('disabled', false);
          if ($el.html() === '全部') {
            $search.find('[name="query"]').val('');
            $search.find('[type="reset"]').hide();
          } else {
            $search.find('[name="type"]').val('tag');
            $search.find('[name="query"]').val($el.html());
            $search.find('[type="reset"]').show();
          }
          $el.closest('.selector-layout-main').find('.selector-pagination').empty();
        }
      }),
      search: Backbone.View.extend({
        events: {
          'input [name="query"]': 'toggleReset',
          'submit form': 'toFilter',
          'reset form': 'toReset'
        },
        render: function () {
          this.$el.html(templates.filters.search({}));
        },
        toggleReset: function (e) {
          var
            $el = $(e.currentTarget),
            $reset = $(e.currentTarget).closest('form').find('[type="reset"]');
          if ($el.val().length > 0) {
            $reset.show();
          } else {
            $reset.hide();
          }
        },
        toFilter: function (e) {
          var
            $el = $(e.currentTarget),
            type = $el.find('[name="type"]').val(),
            query = $el.find('[name="query"]').val(),
            $tagBtn = $el.closest('.selector-layout-main').find('.selector-filters-tag button');
          e.preventDefault();
          model.pagination.set({page: 0}, {silent: true});
          model.filters.search.set({
            filter: 'search',
            type: type,
            query: query
          });
          if (type === 'tag') {
            $tagBtn.filter(function () {
              return $(this).html() === query;
            }).prop('disabled', true);
            $tagBtn.filter(function () {
              return $(this).html() !== query;
            }).prop('disabled', false);
          } else {
            $tagBtn.prop('disabled', false);
          }
          if (model.pagination.get('page') !== 0) {
            $el.closest('.selector-layout-main').find('.selector-pagination').empty();
          }
        },
        toReset: function (e) {
          model.pagination.set({page: 0}, {silent: true});
          model.filters.search.set({
            filter: 'search',
            type: '',
            query: ''
          });
          $('[type="reset"]', e.currentTarget).hide();
          $('[name="query"]', e.currentTarget).focus();
        }
      }),
      eventtype: Backbone.View.extend({
        events: {
          'change select': 'toFilter'
        },
        initialize: function () {
          this.listenTo(model.filters.eventtype, 'change:data', this.render);
        },
        render: function () {
          this.$el.html(templates.filters.eventtype({
            name: config.constructor[setup.type].filters.eventtype,
            data: model.filters.eventtype.get('data')
          }));
        },
        toFilter: function (e) {
          var $el = $(e.currentTarget);
          model.pagination.set({page: 0}, {silent: true});
          model.filters.eventtype.set({query: $el.val()});
          $el.closest('.selector-layout-main').find('.selector-pagination').empty();
        }
      })
    }
  };

  app = Backbone.View.extend({
    events: {
      'renderCompleted .selector-app': 'renderUploader',
      'click .selector-categories button': 'toCategory',
      'click .selector-actions-confirm button': 'callback'
    },
    initialize: function (app_model, app_setup) {
      var self = this;

      newInstance();

      setup = app_setup;

      setup.data = typeof setup.data === 'undefined' || setup.data === '' ? [] : (setup.data.constructor === Array ? setup.data : [setup.data]);

      if (!setup.options.multiple) {
        setup.data = setup.data.slice(0, 1);
      }

      setup.data = _.map(setup.data, function (data) {
        return {id: data};
      });

      setup.options = $.extend(true, {}, config.options[setup.type], setup.options);

      if (!setup.options.multiple) {
        setup.options.max = 1;
      }

      this.listenTo(model.categories, 'change:id', this.fetchData);
      this.listenTo(model.pagination, 'change:page', this.fetchData);
      _.each(config.constructor[setup.type].filters, function (name, type) {
        self.listenTo(model.filters[type], 'change', self.fetchData);
      });
      this.listenTo(model.catalog, 'change', this.setAttributes);

      this.listenTo(collection.memory, 'all', this.onMemoryChange);

      this.view = [];
      this.render();
    },
    render: function () {
      var constructor = $.extend(true, {}, config.constructor[setup.type], {type: setup.type});

      this.$el.html(templates.app(constructor));

      this.renderMemory();
      this.renderPagination();
      this.renderCatalog();

      if (constructor.categories) {
        this.renderCategories();
      }

      if (constructor.filters) {
        this.renderFilters();
      }

      if (constructor.uploader) {
        this.renderUploader();
      }

      this.fetchData();
    },
    renderMemory: function () {
      if (setup.options.multiple) {
        var v = new view.memory({el: this.$('.selector-memory')[0]});
        this.view.push(v);
      }
      collection.memory.reset(setup.data);
    },
    renderPagination: function () {
      var v = new view.pagination({el: this.$('.selector-pagination')[0]});
      this.view.push(v);
    },
    renderCatalog: function () {
      var v = new view.catalog[setup.type]({el: this.$('.selector-catalog')[0]});
      this.view.push(v);
    },
    renderCategories: function () {
      var v = new view.categories({el: this.$('.selector-categories')[0]});
      this.view.push(v);
      model.categories.set({id: config.constructor[setup.type].categories.data[0].id});
    },
    renderFilters: function () {
      var
        self = this,
        constructor = config.constructor[setup.type];
      _.each(constructor.filters, function (name, type) {
        var v = new view.filters[type]({el: self.$('.selector-filters-' + type)[0]});
        self.view.push(v);
        if (type === 'search') {
          v.render();
        }
      });
    },
    renderUploader: function () {
      if ($('.selector-actions-upload').length > 0) {
        var
          $el = this.$('.selector-actions-upload button'),
          uploader = new plupload.Uploader({
            runtimes: 'html5,flash,html4',
            browse_button: $el[0],
            container: this.$('.selector-uploader')[0],
            url: templates.api.uploader({}),
            filters: {
              max_file_size: '10mb',
              mime_types: [
                {title: 'Image files', extensions: 'jpg,jpeg,png,bmp,gif'}
              ]
            },
            flash_swf_url: '/static/img/plupload/Moxie.swf',
            multipart_params: {
              shop_id: setup.setup.shop_id,
              idtype: 'encode'
            },
            init: {
              FilesAdded: function () {
                this.start();
              },
              BeforeUpload: function () {
                this.disableBrowse(true);
                $el.prop('disabled', true).find('span').html('正在上传');
              },
              FileUploaded: function (up, file, data) {
                data = JSON.parse(data.response);
                if (data.status === 'success') {
                  $.notify('上传成功');
                  collection.memory.add(data.data);
                  model.pagination.set({page: 1}, {silent: true});
                  model.catalog.fetch();
                } else {
                  $.notify('上传失败');
                }
              },
              UploadComplete: function (up, data, a) {
                $el.prop('disabled', false).find('span').html('上传图片');
                this.disableBrowse(false);
              }
            }
          });
        uploader.init();
      }
    },
    fetchData: function (b) {
      var constructor = config.constructor[setup.type];

      if (b && ((b.get('id') && !b.previous('id')) || (b.get('page') && !b.previous('page')) || (b.get('filter') !== 'search' && typeof b.get('query') !== 'undefined' && typeof b.previous('query') === 'undefined'))) {
        return;
      }
      
      model.catalog.url = templates.api.catalog({
        type: setup.type,
        category: model.categories.get('id'),
        filter: typeof b === 'undefined' ? undefined : b.get('type'),
        query: typeof b === 'undefined' ? undefined : b.get('query'),
        limit: constructor.catalog.limit,
        page: model.pagination.get('page') || 1
      });

      this.$('.selector-catalog').html('<div class="selector-catalog-preloader"></div>');

      model.catalog.clear({silent: true});
      model.catalog.fetch();
    },
    toCategory: function (e) {
      var id = $(e.currentTarget).val();
      model.pagination.set({page: 1, pages: 0}, {silent: true});
      model.categories.set({id: id});
      if (id === 'other') {
        this.$('.selector-actions-upload').removeClass('hide');
      } else {
        this.$('.selector-actions-upload').addClass('hide');
      }
    },
    setAttributes: function () {
      if (model.catalog.get('status') !== 'success') {
        return;
      }

      this.setPagination();
      this.setCatalog();
      this.setFilters();
    },
    setPagination: function () {
      var
        map = config.constructor[setup.type].pagination.map,
        data = map ? map.call(null, model.catalog.get('data')) : model.catalog.get('data');

      model.pagination.set(data);
    },
    setCatalog: function () {
      var
        map = config.constructor[setup.type].catalog.map,
        data = map ? map.call(null, model.catalog.get('data')) : model.catalog.get('data');

      collection.catalog.reset(data);
    },
    setFilters: function () {
      _.each(config.constructor[setup.type].filters, function (name, type) {
        if (model.filters[type].get('data')) {
          return;
        }
        if (type === 'search') {
          return;
        }
        $.ajax({
          url: templates.api.filter({
            filter: type
          }),
          success: function (data) {
            if (data.status === 'success') {
              model.filters[type].set({
                data: data.data,
                filter: type,
                type: type,
                query: ''
              });
            }
          }
        });
      });
    },
    onMemoryChange: function (e, b) {
      this.$el.trigger('memoryChange', [e, collection.memory.toJSON(), b.toJSON()]);
    },
    callback: function () {
      var data = collection.memory.toJSON();
      data = setup.options.multiple ? data : _.first(data);
      setup.callback.call(this, data);
      this.destroy();
    },
    destroy: function () {
      _.each(this.view, function (view) {
        view.remove();
      });
      model = undefined;
      collection = undefined;
      setup = undefined;
      this.remove();
    }
  });

  module.exports = app;
});
