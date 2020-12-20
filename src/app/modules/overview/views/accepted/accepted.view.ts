import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { AcceptedService } from '../../accepted.service';
import { Accepted } from '../../models/accepted';

interface SearchValues {
	filter: string;
	from: Date;
	to: Date;
}

@Component({
	selector: 'app-accepted',
	templateUrl: './accepted.view.html',
	styleUrls: ['./accepted.view.scss'],
})
export class AcceptedView implements OnInit, AfterViewInit {

	displayedColumns = ['inquirer', 'contact', 'itemTitle', 'itemPrice', 'dateReservation'];
	public dataSource: MatTableDataSource<Accepted> = new MatTableDataSource();
	public resultLength: number = 0;
	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	formGroup!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private accepted: AcceptedService
	) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({
			filter: '',
			from: null,
			to: null
		});
		this.accepted.getAll()
			.pipe(tap(items => this.resultLength = items.length))
			.subscribe(items => this.dataSource.data = items);
		this.formGroup
			.valueChanges
			.pipe(
				debounceTime(200),
				filter(() => this.formGroup.valid),
				map(val => {
					return <SearchValues> {
						filter: val.filter.trim().toLowerCase(),
						from: val.from,
						to: val.to
					}
				}))
			.subscribe(val => {
				// TRIM! else every iteration has to trim

				this.dataSource.filter = JSON.stringify(val);
				if (this.dataSource.paginator) {
				  this.dataSource.paginator.firstPage();
				}
			})
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.dataSource.filterPredicate = this.createFilter();
	}

	private createFilter() {
		const filterFunction = function (data: Accepted, currentFilter: string): boolean {
			let searchTerms: SearchValues = <SearchValues>JSON.parse(currentFilter);

			const {filter, from , to} = searchTerms;

			if (filter && data.filterSearch?.indexOf(filter) === -1) {
				return false;
			}

			console.log(from);
			console.log(data.dateReservation);
			if (from && from > data.dateReservation) {
				return false;
			}
			if (from && to < data.dateReservation) {
				return false;
			}
			return true;
		  }
		  return filterFunction
	}
}
