import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inquiry, InquiryDb } from './models/inquiry';

@Injectable({
	providedIn: 'root',
})
export class InquiryService {
	private path: string = '/api/inquiry';
	constructor(private http: HttpClient) {}

	getAll(): Observable<Inquiry[]> {
		return this.http.get<InquiryDb[]>(this.path)
			.pipe(map(items => items.map(i => new Inquiry(i))));
	}
}
