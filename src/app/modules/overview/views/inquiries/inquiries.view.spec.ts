import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiriesView } from './inquiries.view';

describe('InquiriesComponent', () => {
	let component: InquiriesView;
	let fixture: ComponentFixture<InquiriesView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InquiriesView],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InquiriesView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
