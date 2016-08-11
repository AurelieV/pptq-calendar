// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import { AppState } from './app.service';

require("!style!css!font-awesome/css/font-awesome.min.css");
require("!style!css!sass!./utils/bulma.scss");

// Application wide providers
export const APP_PROVIDERS = [
  AppState
];
