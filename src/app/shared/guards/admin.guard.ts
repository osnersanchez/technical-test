import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserData } from '../declaraciones/interfaces';
import { WebDataService } from '../services/web-data/web-data.service';

export const adminGuard: CanActivateFn = () => {
  const webDataService = inject(WebDataService);
  const user: UserData = webDataService.getDataSession();

  return user.id?.includes('admin')
    ? true
    : inject(Router).createUrlTree(['/list-product']);
};

export const userGuard: CanActivateFn = () => {
  const webDataService = inject(WebDataService);
  const user: UserData = webDataService.getDataSession();

  return Boolean(user.token) ? true : inject(Router).createUrlTree(['/login']);
};
