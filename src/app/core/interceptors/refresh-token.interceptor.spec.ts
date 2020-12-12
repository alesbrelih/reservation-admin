import { TestBed } from '@angular/core/testing';

import { RefreshTokenInterceptor } from './refresh-token.interceptor';

describe('RefreshTokenInterceptor', () => {
	let service: RefreshTokenInterceptor;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RefreshTokenInterceptor);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
