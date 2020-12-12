import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';

export enum AuthGuardType {
	AUTHENICATED,
	UNAUTHENTICATED,
}

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
		return true;
	}
}
