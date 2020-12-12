import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedView } from './views/accepted/accepted.view';
import { MatTabsModule } from '@angular/material/tabs';
import { BaseOverviewView } from './views/base-overview/base-overview.view';
import { InquiriesView } from './views/inquiries/inquiries.view';

const routes: Routes = [
	{
		path: '',
		component: BaseOverviewView,
		children: [{
			path: 'accepted',
			component: AcceptedView,
		}, {
			path: 'inquiries',
			component: InquiriesView
		},
		{
			path: '**',
			pathMatch: 'full',
			redirectTo: 'accepted',
		}]
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), MatTabsModule],
	declarations: [AcceptedView, BaseOverviewView, InquiriesView],
})
export class OverviewModule {}
