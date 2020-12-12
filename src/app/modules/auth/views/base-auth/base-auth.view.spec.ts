import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuthView } from './base-auth.view';

describe('BaseAuthView', () => {
	let component: BaseAuthView;
	let fixture: ComponentFixture<BaseAuthView>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BaseAuthView],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BaseAuthView);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
