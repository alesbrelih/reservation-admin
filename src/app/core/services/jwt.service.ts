import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { AuthTokens } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class JwtService {

	private static readonly TOKEN_KEY = 'r-token';
	private static readonly REFRESH_TIME = 120000;

	private _tokens!: AuthTokens;
	private accessExpiration: number = 0;

	private set tokens(val: AuthTokens) {
		this._tokens = val;
		this.storage.store(JwtService.TOKEN_KEY, val);
		this.setExpiration(val?.access ?? null);
	}

	get accessToken(): string {
		return this._tokens?.access ?? '';
	}

	get refreshToken(): string {
		return this._tokens?.refresh ?? '';
	}

	get hasToRefresh(): boolean {
		console.log("has to refresh?");
		console.log(this.accessExpiration);
		console.log(Date.now());
		console.log(this.accessExpiration - Date.now())
		return (this.accessExpiration - Date.now()) < JwtService.REFRESH_TIME;
	}

	constructor(private storage: LocalStorageService) {
		this.initialize();
	}

	private initialize(): void {
		this.tokens = this.storage.retrieve(JwtService.TOKEN_KEY);
	}

	public saveTokens(tokens: AuthTokens): void {
		this.tokens = tokens;
	}

	private setExpiration(jwt: string): void {
		if (jwt) {
			// since we compare to miliseconds new Date().token
			this.accessExpiration = JSON.parse(atob(jwt.split('.')[1])).exp * 1000;
		}
	}

	public clearTokens(): void {
		this.tokens = {access: '', refresh: ''};
	}

}
