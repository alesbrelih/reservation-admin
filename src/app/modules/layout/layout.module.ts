import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutView } from './views/layout/layout.view';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: LayoutView,
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	declarations: [LayoutView],
})
export class LayoutModule {}
