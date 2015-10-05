environment = :development;
output_style = (environment == :production) ? :compressed : :expanded
Encoding.default_external = "utf-8"
relative_assets = true
fonts_dir        = 'font'
css_dir         = 'css'
sass_dir        = 'scss'
images_dir      = 'img'
#http_images_path = '../img'

#no asset cache
asset_cache_buster do |http_path, real_path|
  nil
end
