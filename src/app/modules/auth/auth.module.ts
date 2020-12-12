import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseAuthView } from './views/base-auth/base-auth.view';
import { LoginView } from './views/login/login.view';
import { RouterModule, Routes } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

const routes: Routes = [{
	path: '',
	component: BaseAuthView,
	children: [{
		path: 'login',
		component: LoginView
	}, {
		path: '**',
		pathMatch: 'full',
		redirectTo: 'login'
	}]
}];

@NgModule({
	declarations: [BaseAuthView, LoginView],
	imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), MatInputModule],
})
export class AuthModule {}
