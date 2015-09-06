seajs.config({
  map: [
    [ /^(.*\.(?:css|js))(.*)$/i, '$1?{{$TIME_STAMP}}' ]
  ]
});