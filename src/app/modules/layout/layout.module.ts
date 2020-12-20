import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutView } from './views/layout/layout.view';
import { RouterModule, Routes } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
	{
		path: '',
		component: LayoutView,
		children: [{
			path: 'overview',
			loadChildren: () => import('../overview/overview.module').then(m => m.OverviewModule)
		}]
	},
];

@NgModule({
	imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, RouterModule.forChild(routes)],
	declarations: [LayoutView],
})
export class LayoutModule {}
