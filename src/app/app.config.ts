import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import routeConfig from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideProtractorTestingSupport(),provideRouter(routeConfig)]
};
