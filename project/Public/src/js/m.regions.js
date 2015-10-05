define(function(require, exports, module){
  var regionCache = {};

  var Regions = function(el, opts){
    return this.init(el, opts);
  };

  Regions.prototype = {
    init: function(el, opts){
      var self = this,
          inst;

      this.$el = $(el);
      if (!this.$el.length) return false;
      if ((inst = this.$el.data('regions'))) {
        return inst;
      }

      this.opts = $.extend({
        url: 'http://api.yl.wdwd.com/api.php?method=region.info&callback=?',
        names: ['province', 'city', 'district']
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
        this.setRegions(data);
      }

      return this;
    },

    getRegion: function(id, cb){
      var self = this;
      if (regionCache[id]) cb(regionCache[id]);
      else {
        $.ajax({
          url: this.opts.url,
          data: { name: id },
          dataType: 'jsonp',
          success: function(data){
            if (data.status == 'success') {
              regionCache[id] = data.data;
              cb(data.data);
            }
          }
        });
      }
    },

    setRegions: function(regions){
      var self = this;
      $.each(regions, function(idx, id){
        if (idx <= 0) self.renderSelect(0, null, id);
        else self.renderSelect(idx, regions[idx - 1], id);
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
        this.getRegion(id, function(data){
          select.prop('disabled', false);
          $.each(data, function(i, item){
            var $option = $('<option value="'+item.name+'">'+item.name+'</option>');
            if (idSelected && idSelected == item.name) $option.prop('selected', true);
            select.append($option);
          });
        });
      }

      return this;
    },

    addSelect: function(idx){
      var names = this.opts.names,
          self = this;

      var select = $('<select class="wgt-region-select" name="'+names[idx]+'" disabled><option value="">请选择</option></select>').appendTo(this.$el);
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
    if ($.fn.regions) return false;

    $.fn.regions = function(opts){
      return this.each(function(){
        var regions = new Regions(this, opts);
        if (regions) $(this).data('regions', regions);

        return this;
      });
    };
  };
});