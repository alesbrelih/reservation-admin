import { Component, OnInit } from '@angular/core';

interface OverviewLink {
	path: string;
	title: string;
}

@Component({
	selector: 'app-base-overview',
	templateUrl: './base-overview.view.html',
	styleUrls: ['./base-overview.view.scss'],
})
export class BaseOverviewView implements OnInit {
	links: OverviewLink[] = [
		{
			path: '/overview/accepted',
			title: 'Accepted',
		},
		{
			path: '/overview/inquiries',
			title: 'Inquiries',
		},
		{
			path: '/overview/profit',
			title: 'Profit',
		},
	];
	constructor() {}

	ngOnInit(): void {}
}
