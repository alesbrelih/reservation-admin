import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutView } from './views/layout/layout.view';
import { RouterModule, Routes } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';

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
	imports: [CommonModule, MatSidenavModule, RouterModule.forChild(routes)],
	declarations: [LayoutView],
})
export class LayoutModule {}
