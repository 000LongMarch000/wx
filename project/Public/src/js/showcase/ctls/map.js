define(function(require, exports, module){
  var CtlBase = require('./base'),
      tpl = require('../tpls/ctl_map.tpl');

  var resultsTpl = Handlebars.compile('<ul class="map-search-results">{{#each items}}<li><a class="item" href="javascript:;" data-point="{{point.lng}},{{point.lat}}" data-title="{{title}}" data-address="{{address}}">{{title}}, {{address}}</a></li>{{/each}}</ul>');

  var CtlMap = CtlBase.View.extend({
    template: Handlebars.compile(tpl),

    events: {
      'click .btn-primary': 'search',
      'click .map-results .item': 'selectPoint',
      'mouseenter .map-results': 'hoverResults',
      'mouseleave .map-results': 'hoverResults'
    },

    render: function(data){
      CtlBase.View.prototype.render.apply(this, arguments);

      var el = this.$el.find('.map-viewport')[0],
          map = new BMap.Map(el),
          self = this;

      this.$input = this.$el.find('input[name=loc_addr_txt]');
      this.$results = this.$el.find('.map-results');

      map.centerAndZoom(this.makePoint(data.loc_center), data.loc_zoom);
      map.enableScrollWheelZoom(true);
      map.addEventListener('zoomend', _.bind(this.updateZoom, this));

      var local = new BMap.LocalSearch(map, {
        pageCapacity: 20,
        onSearchComplete: function(results){
          if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            var items = [];
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var item = results.getPoi(i);
              items.push({
                title: item.title,
                address: item.address,
                point: item.point
              });
            };

            self.$results.html(resultsTpl({ items: items }));
          }
        }
      });

      //如果默认值上海，根据ip取城市
      if (data.loc_center == '上海') {
        var city = new BMap.LocalCity();
        city.get(function(r){
          if (r.center) {
            var center = [r.center.lng, r.center.lat].join();
            self.trigger('update', {
              loc_center: center
            });
            map.setCenter(r.center);
          }
        });
      }

      this.map = map;
      this.local = local;

      if (data.loc_marker) {
        this.renderMarker(data.loc_marker);
      }

      return this;
    },

    search: function(){
      var val = this.$input.val();
      if (!!val) {
        this.map.clearOverlays();
        this.$results.show().html('<p class="loading"></p>');
        this.local.search(val);
      }
    },

    makePoint: function(str){
      if (str.indexOf(',')) {
        //lng, lat
        var pointArr = str.split(',');
        return new BMap.Point(pointArr[0], pointArr[1]);
      } else {
        //cityname
        return str;
      }
    },

    selectPoint: function(e){
      var $this = $(e.currentTarget),
          ptStr = $this.data('point'),
          map = this.map,
          addr = [$this.data('title'), $this.data('address')].join(),
          centerPoint;

      this.renderMarker(ptStr);
      centerPoint = map.getCenter();
      this.$input.val(addr);

      this.trigger('update', {
        loc_center: [centerPoint.lng, centerPoint.lat].join(),
        loc_zoom: map.getZoom(),
        loc_addr_txt: addr,
        loc_marker: $this.data('point')
      });
    },

    renderMarker: function(pointStr){
      if (!this.map) return;

      var map = this.map,
          point = this.makePoint(pointStr),
          marker = new BMap.Marker(point);

      map.clearOverlays();
      map.addOverlay(marker);
      map.panTo(point, { noAnimation: true });
    },

    hoverResults: (function(){
      var timer;
      return function(e){
        if (e.type == 'mouseleave') {
          timer = setTimeout(function(){
            $(e.currentTarget).hide();
          }, 500);
        } else {
          if (timer) clearTimeout(timer);
        }
      }
    })(),

    updateZoom: function(){
      if (!this.map) return;

      var zoom = this.map.getZoom();
      this.trigger('update', {
        loc_zoom: zoom
      });
    },

    remove: function(){
      this.map = this.local = null;
      CtlBase.View.prototype.remove.call(this);
    }
  });

  module.exports = CtlMap;
});