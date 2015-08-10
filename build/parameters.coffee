app_path = 'client'
web_path = 'www'

config =
  backend_route: '/api'
  app_path: app_path
  server_path: 'server'
  web_path: web_path
  vendor_path: 'vendor'
  assets_path: "#{app_path}/assets"
  backend_main_file: 'server/server.coffee'
  build_temp_path: 'build/temp'

  app_main_file: 'app.js'
  css_main_file: 'app.css'
  less_main_file: "#{app_path}/app.less"
  templates_file: 'app.templates.js'
  templates_module: 'pptq-calendar.templates'
  vendor_main_file: 'vendor.js'

module.exports = config
