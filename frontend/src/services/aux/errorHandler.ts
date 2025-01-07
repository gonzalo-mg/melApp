import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'An error occurred.';
  if (error.error instanceof ErrorEvent) {
    // cliente
    errorMessage = `Client Error: ${error.error.message}.`;
  } else {
    // server
    errorMessage = `Server Error - Code: ${error.status}. Message: ${error.message}; ${error.error.message}.`;
  }
  console.error(errorMessage);
  return throwError(() => new Error(errorMessage));
}
