import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { JwtService } from '../services/jwt.service';

export enum AuthGuardType {
	AUTHENICATED,
	UNAUTHENTICATED,
}

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private jwt: JwtService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		const type: AuthGuardType = route.data?.authType;
		if (!Utils.isDefined(type)) {
			throw new Error(
				`Authguard must have data -> authType: AuthGuardType`
			);
		}
		return this.validateAccess(type);
	}
	private validateAccess(authGuardType: AuthGuardType): boolean {
		// currently just checking if has token
		// maybe add some time check if needed
		if (authGuardType == AuthGuardType.UNAUTHENTICATED && !!this.jwt.accessToken) {
			return false;
		}
		if (authGuardType == AuthGuardType.AUTHENICATED &&  !this.jwt.accessToken) {
			this.router.navigate(['/auth/login']);
			return false;
		}
		return true;
	}
}
