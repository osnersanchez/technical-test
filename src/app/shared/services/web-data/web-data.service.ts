import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserData } from '../../declaraciones/interfaces';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WebDataService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getDataSession(): UserData {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('session') || '{}') as UserData;
    }

    return {} as UserData;
  }
}
