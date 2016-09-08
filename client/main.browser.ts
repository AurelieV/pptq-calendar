import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App } from './app/app';
import appModule from './app';

@NgModule({
  bootstrap: [
    App
  ],
  declarations: [
    App
  ],
  imports: [
    // Angular 2
    BrowserModule,
    RouterModule.forRoot([]),
    // app
    appModule
    // vendors
  ],
  providers: []
})
class MainModule {}

export function main() {
  return platformBrowserDynamic().bootstrapModule(MainModule);
}























// Hot Module Replacement

export function bootstrapDomReady() {
  // bootstrap after document is ready
  document.addEventListener('DOMContentLoaded', main);
}

if ('development' === ENV && HMR) {
  // activate hot module reload
  if (document.readyState === 'complete') {
    main();
  } else {
    bootstrapDomReady();
  }
  module.hot.accept();
} else {
  bootstrapDomReady();
}
