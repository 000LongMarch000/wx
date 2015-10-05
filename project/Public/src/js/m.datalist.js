define(function(require, exports, module){
  var DataList = function(){
    return this.init.apply(this, arguments);
  };

  DataList.prototype = {
    constructor: DataList,

    setOpts: function(opts){
      if (!this.opts) this.opts = {};
      this.opts = $.extend(true, this.opts, opts || {});

      return this;
    },

    init: function(el, opts){
      var $el = $(el);
      if (!$el.length) return false;
      this.$el = $el;
      this.setOpts($.extend({
        idPrefix: 'l'
      }, opts || {}));

      this.selected = [];
      this.totalSelect = this.getTotalSelect();

      this.render().bindEvents();

      return this;
    },

    getTotalSelect: function(){
      return this.$el.find('.select-item').length;
    },

    getItem: function(id){
      id = '#' + this.opts.idPrefix + '_' + id;

      return $(id);
    },

    getSelectedItems: function(){
      var idPrefix = this.opts.idPrefix,
          ids = _.map(this.selected, function(){
            return '#' + idPrefix + '_' + id;
          }).join(',');

      return $(ids);
    },

    getSelected: function(){
      return this.selected;
    },

    select: function(id){
      if ($.inArray(id, this.selected) < 0) this.selected.push(id);
      if (this.selected.length >= this.totalSelect) this.$checkAll.prop('checked', true);

      return this;
    },

    deselect: function(id){
      if (this.selected.length >= this.totalSelect) this.$checkAll.prop('checked', false);

      var idx= $.inArray(id, this.selected);
      if (idx >= 0) this.selected.splice(idx, 1);

      return this;
    },

    del: function(id){
      var idx = _.indexOf(this.selected, id);
      if (idx >= 0) {
        this.selected.splice(id, 1);
        this.totalSelect --;
      }

      return this;
    },

    add: function(){
      this.totalSelect ++;

      return this;
    },

    update: function(){
      this.totalSelect = this.getTotalSelect();

      if (this.selected.length == this.totalSelect) this.$checkAll.prop('checked', true);
      else this.$checkAll.prop('checked', false);

      return this;
    },

    selectAll: function(){
      var self = this;
      this.$el.find('.select-item').not(':checked').click();
    },

    deselectAll: function(){
      var self = this;
      this.$el.find('.select-item').filter(':checked').click();
    },

    render: function(){
      this.$checkAll = this.$el.find('.select-all');

      return this;
    },

    bindEvents: function(){
      var self = this;
      this.$checkAll.on('click', function(){
        if ($(this).is(':checked')) self.selectAll();
        else self.deselectAll();
      });

      this.$el.on('click', '.select-item', function(e){
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.data('id');

        if (!id) return;
        if ($this.is(':checked')) self.select(id);
        else self.deselect(id);
      });

      return this;
    },

    destroy: function(){
      this.$el = null;
      this.selected = null;

      return this;
    }
  };

  module.exports = DataList;
});