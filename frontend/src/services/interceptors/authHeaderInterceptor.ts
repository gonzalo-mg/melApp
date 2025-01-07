import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authHeaderInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const token = localStorage.getItem('token');
  // si no existe token pasar sin interceptar
  if (!token) {
    return next(req);
  }

  // interceptar y añadir header
  const continueReq = req.clone({
    headers: req.headers.append('Authorization', token),
  });
  return next(continueReq);
}
