import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/modules/auth/views/login/login.view';

export interface AuthTokens {
	access: string;
	refresh: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	login(obj: Login): Observable<AuthTokens> {
		return this.http.post<AuthTokens>('/api/auth/login', obj);
	}
}
