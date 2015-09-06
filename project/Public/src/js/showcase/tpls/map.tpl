<div class="comp comp-map" {{style style}}>
  <div class="map-cont">
    <img class="map-static" src="http://api.map.baidu.com/staticimage?width=320&height=240&center={{data.loc_center}}&markers={{data.loc_marker}}&zoom={{data.loc_zoom}}&copyright=1" >
    <ul class="map-details">
      {{#if data.name_txt}}<li>{{data.name_txt}}</li>{{/if}}
      {{#if data.address_txt}}<li>地址：{{data.address_txt}}</li>{{/if}}
      {{#if data.traffic_txt}}<li>交通：{{data.traffic_txt}}</li>{{/if}}
    </ul>
  </div>
</div>

{{> edit_helper}}