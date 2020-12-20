import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { InquiryService } from '../../inquiry.service';
import { Inquiry } from '../../models/inquiry';

interface SearchValues {
	filter: string;
	from: Date;
	to: Date;
}

@Component({
	selector: 'app-inquiries',
	templateUrl: './inquiries.view.html',
	styleUrls: ['./inquiries.view.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition(
				'expanded <=> collapsed',
				animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
			),
		]),
	],
})
export class InquiriesView implements OnInit {
	expandedElement!: Inquiry | null;

	displayedColumns = [
		'inquirer',
		'contact',
		'itemTitle',
		'itemPrice',
		'dateCreated',
		'dateReservation',
	];
	public dataSource: MatTableDataSource<Inquiry> = new MatTableDataSource();
	public resultLength: number = 0;
	@ViewChild(MatSort)
	sort!: MatSort;

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	formGroup!: FormGroup;

	constructor(private fb: FormBuilder, private inquiry: InquiryService) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({
			filter: '',
			from: null,
			to: null,
		});
		this.inquiry
			.getAll()
			.pipe(tap((items) => (this.resultLength = items.length)))
			.subscribe((items) => (this.dataSource.data = items));
		this.formGroup.valueChanges
			.pipe(
				debounceTime(200),
				filter(() => this.formGroup.valid),
				map((val) => {
					return <SearchValues>{
						filter: val.filter.trim().toLowerCase(),
						from: val.from,
						to: val.to,
					};
				})
			)
			.subscribe((val) => {
				// TRIM! else every iteration has to trim

				this.dataSource.filter = JSON.stringify(val);
				if (this.dataSource.paginator) {
					this.dataSource.paginator.firstPage();
				}
			});
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.dataSource.filterPredicate = this.createFilter();
	}

	private createFilter() {
		const filterFunction = function (
			data: Inquiry,
			currentFilter: string
		): boolean {
			let searchTerms: SearchValues = <SearchValues>(
				JSON.parse(currentFilter)
			);

			const { filter, from, to } = searchTerms;

			if (filter && data.filterSearch?.indexOf(filter) === -1) {
				return false;
			}

			if (from && from > data.dateReservation) {
				return false;
			}
			if (from && to < data.dateReservation) {
				return false;
			}
			return true;
		};
		return filterFunction;
	}
}
