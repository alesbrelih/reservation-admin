import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
	providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
	constructor(
		private jwt: JwtService
	) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.isUrlExcluded(req.url)) {
			return next.handle(req);
		}

		const access: string = this.jwt.accessToken;
		const headers: HttpHeaders = req.headers.append('Authorization', `Bearer ${access}`);

		return next.handle(req.clone({
			headers: headers
		}));
	}

	private isUrlExcluded(url: string): boolean {
		return url.toLowerCase().startsWith('/api/auth/') && !url.startsWith('/');
	}

}
