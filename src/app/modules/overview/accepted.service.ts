import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Accepted, AcceptedDb } from './models/accepted';

@Injectable({
	providedIn: 'root',
})
export class AcceptedService {
	private path: string = '/api/accepted';
	constructor(private http: HttpClient) {}

	getAll(): Observable<Accepted[]> {
		return this.http.get<AcceptedDb[]>(this.path)
			.pipe(map(items => items.map(i => new Accepted(i))));
	}
}
