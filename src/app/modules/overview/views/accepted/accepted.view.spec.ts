import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedView } from './accepted.view';

describe('AcceptedComponent', () => {
	let component: AcceptedView;
	let fixture: ComponentFixture<AcceptedView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AcceptedView],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AcceptedView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
