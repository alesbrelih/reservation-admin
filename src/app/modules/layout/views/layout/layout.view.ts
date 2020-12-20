import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.view.html',
	styleUrls: ['./layout.view.scss'],
})
export class LayoutView implements OnInit {

	links = [
		{
			route: '/calendar',
			title: 'Calendar'
		}, {
			route: '/overview',
			title: 'Overview'
		}, {
			route: '/items',
			title: 'Items'
		}];

	constructor() {}

	ngOnInit(): void {}
}
