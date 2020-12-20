import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedView } from './views/accepted/accepted.view';
import { MatTabsModule } from '@angular/material/tabs';
import { BaseOverviewView } from './views/base-overview/base-overview.view';
import { InquiriesView } from './views/inquiries/inquiries.view';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MultiplePipe } from './pipes/multiple.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PricePipe } from './pipes/price.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, MatDatepickerModule, FlexLayoutModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatTableModule, MatSortModule, RouterModule.forChild(routes), MatTabsModule],
	declarations: [AcceptedView, BaseOverviewView, InquiriesView, MultiplePipe, PricePipe],
})
export class OverviewModule {}
