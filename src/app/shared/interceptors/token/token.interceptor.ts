import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // const authToken = environment.apiKey;

  // const authReq = req.clone({
  //   setHeaders: {
  //     'x-rapidapi-key': authToken
  //   }
  // });

  return next(req);
};
