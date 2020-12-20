import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/modules/auth/views/login/login.view';
import { JwtService } from './jwt.service';
import { tap } from 'rxjs/operators';

export interface AuthTokens {
	access: string;
	refresh: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private jwt: JwtService) {}

	login(obj: Login): Observable<AuthTokens> {
		return this.http.post<AuthTokens>('/api/auth/login', obj)
			.pipe(
				tap(tokens => this.jwt.saveTokens(tokens))
			);
	}

	refresh(refreshToken: string): Observable<AuthTokens> {
		console.log("AM I BEING TRIGGERED");
		return this.http.post<AuthTokens>(`/api/auth/refresh`, {refreshToken})
			.pipe(
				tap(tokes => console.log("BACK", tokes)),
				tap(tokens => this.jwt.saveTokens(tokens))
			);
	}
}
