Encoding.default_external = "utf-8"

#no asset cache
deploy_version = 1
asset_cache_buster do |http_path, file|
  if file
    file.mtime.strftime("%s")
  else
    "v=#{deploy_version}"
  end
end