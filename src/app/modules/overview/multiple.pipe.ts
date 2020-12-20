import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'multiple',
})
export class MultiplePipe implements PipeTransform {
	transform(value: any, ...properties: string[]): string {
		return Object.keys(value).reduce((prev, curr) => {
			if (!properties.includes(curr)) {
				return prev;
			}
			if (!prev) {
				return value[curr];
			}
			return `${prev},${value[curr]}`;
		}, '');
	}
}
