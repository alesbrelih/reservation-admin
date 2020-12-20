import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { filter, finalize, switchMap, switchMapTo, take, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class RefreshTokenInterceptor implements HttpInterceptor {

	private queue$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private refreshInProgress: boolean = false;

	constructor(
		private jwt: JwtService,
		private auth: AuthService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.isUrlExcluded(req.url)) {
			return next.handle(req);
		}

		if (!this.jwt.hasToRefresh) {
			console.log("HAS TO REFRESH");
			return next.handle(req);
		}

		if (this.refreshInProgress) {
			return this.queue$
				.pipe(
					filter(el => !!el),
					take(1),
					switchMapTo(next.handle(req))
				);
		}

		this.refreshInProgress = true;
		this.queue$.next(false);
		return this.auth.refresh(this.jwt.refreshToken)
			.pipe(
				tap(() => this.queue$.next(true)),
				switchMap(() => next.handle(req)),
				finalize(() => this.refreshInProgress = false)
			);
	}

	private isUrlExcluded(url: string): boolean {
		return url.toLowerCase().startsWith('/api/auth/') || !url.startsWith('/');
	}
}
