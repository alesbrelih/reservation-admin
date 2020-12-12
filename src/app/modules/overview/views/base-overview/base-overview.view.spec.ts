import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseOverviewView } from './base-overview.view';

describe('BaseOverviewView', () => {
	let component: BaseOverviewView;
	let fixture: ComponentFixture<BaseOverviewView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BaseOverviewView],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BaseOverviewView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
