import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';

@Injectable({
	providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(private jwt: JwtService, private router: Router) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(req)
			.pipe(
				catchError((err: HttpErrorResponse) => {
					if ([401, 403].includes(err.status)) {
						this.jwt.clearTokens();
					}

					// TODO: use service to show error as notification
					this.router.navigate(['/auth/login']);

					if (err.status >= 500) {
						// maybe think of logging
						console.error("error");
					}

					return throwError(err);
				})
			)
	}
}
