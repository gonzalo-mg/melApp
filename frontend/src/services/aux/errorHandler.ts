import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class ErrorAtServiceHandler {
  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}.`;
    } else {
      // Server-side error
      errorMessage = `Error from server - Code: ${error.status}. Message: ${error.message}; ${error.error.message}. `; // el ultimo string es el mensaje de error especifico q envio desde el backend
    }
    return throwError(() => new Error(errorMessage));
  }
}
