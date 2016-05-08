var app_path = 'client';
var web_path = 'www';
var server_path = 'server';
var bower_path = 'bower_components';

var config = {
  app_path: app_path,
  assets_path: `${app_path}/assets`,
  server_path: server_path,
  web_path: web_path,

  dependencies: ['node_modules/@angular/router/angular1/angular_1_router.js'],

  backend_route: '/api',
  backend_main_file: `${server_path}/pptq-calendar.js`,

  app_main_file: 'app.js',
  css_main_file: 'app.css',
  css_files: [`${bower_path}/angular-material/angular-material.min.css`],
  sass_main_file: `${app_path}/app.scss`,
  templates_file: 'app.templates.js',
  templates_module: 'pptq-calendar.templates',
  vendor_main_file: 'vendor.js'
};

module.exports = config;
