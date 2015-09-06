define(function(require, exports, module){
  var categoryCache = {};

  var Category = function(el, opts){
    return this.init(el, opts);
  };

  Category.prototype = {
    init: function(el, opts){
      var self = this,
          inst;

      this.$el = $(el);
      if (!this.$el.length) return false;
      if ((inst = this.$el.data('category'))) {
        return inst;
      }

      this.opts = $.extend({
        url: 'http://api.yl.wdwd.com/api.php?method=category.info&callback=?',
        names: ['primary', 'secondary']
        //data: []
      }, opts || {});

      this.render(this.opts.data);

      return this;
    },

    render: function(data){
      var $el = this.$el,
          names = this.opts.names,
          self = this;

      for (var i = 0, l = names.length; i < l; i++) {
        this.addSelect(i);
      }
      if (!data || data.length != names.length) {
        this.renderSelect(0, null);
      } else {
        this.setCategory(data);
      }

      return this;
    },

    getCategory: function(id, cb){
      var self = this;
      if (categoryCache[id]) cb(categoryCache[id]);
      else {
        $.ajax({
          url: this.opts.url,
          data: { id: id },
          dataType: 'jsonp',
          success: function(data){
            if (data.status == 'success') {
              categoryCache[id] = data.data;
              cb(data.data);
            }
          }
        });
      }
    },

    setCategory: function(category){
      var self = this;
      $.each(category, function(idx, id){
        if (idx <= 0) self.renderSelect(0, null, id);
        else self.renderSelect(idx, category[idx - 1], id);
      });

      return this;
    },

    renderSelect: function(idx, id, idSelected){
      var select = this.$sels.eq(idx);

      if (!select.length) {
        select = this.addSelect(idx);
      } else {
        select.empty().prop('disabled', true);
      }
      select.append('<option value="">请选择</option>');

      if (id !== undefined) {
        this.getCategory(id, function(data){
          select.prop('disabled', false);
          $.each(data, function(i, item){
            var $option = $('<option value="'+item.id+'">'+item.name+'</option>');
            if (idSelected && idSelected == item.id) $option.prop('selected', true);
            select.append($option);
          });
        });
      }

      return this;
    },

    addSelect: function(idx){
      var names = this.opts.names,
          self = this;

      var select = $('<select class="wgt-category-select" name="'+names[idx]+'" disabled><option value="">请选择</option></select>').appendTo(this.$el);
      if (idx != names.length - 1) {
        select.on('change', function(){
          var id = $(this).val();
          if (!id) return false;

          for(var i = idx + 1, l = names.length - 1; i <= l; i ++) {
            if (i == idx + 1) self.renderSelect(i, id);
            else self.renderSelect(i);
          }
        });
      }
      this.$sels = this.$el.children('select');

      return select;
    },

    destroy: function(){
      this.$el.empty().remove();
      this.$el = this.$sels = null;

      return this;
    }
  };


  module.exports = function($) {
    if ($.fn.category) return false;

    $.fn.category = function(opts){
      return this.each(function(){
        var category = new Category(this, opts);
        if (category) $(this).data('category', category);

        return this;
      });
    };
  };
});
