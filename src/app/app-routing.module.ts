import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardType } from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		data: {
			authType: AuthGuardType.AUTHENICATED,
		},
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./modules/layout/layout.module').then(
				(m) => m.LayoutModule
			),
	},
	{
		path: 'auth',
		data: {
			authType: AuthGuardType.UNAUTHENTICATED,
		},
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./modules/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
