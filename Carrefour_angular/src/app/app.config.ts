import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { StorageGlobalService } from './servicios/store-global.service';
import IStorageService from './modelos/IStorageServices';

export const HTTP_INJECTIONTOKEN_STORAGE_SVCS:InjectionToken<IStorageService>=new InjectionToken<IStorageService>('token asociado a servicios q implementan interface IStorageService');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INJECTIONTOKEN_STORAGE_SVCS, useClass: StorageGlobalService },
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), provideClientHydration(withEventReplay()),
     provideHttpClient(),

    ]
};
