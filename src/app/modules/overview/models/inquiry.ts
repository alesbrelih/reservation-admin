import { ItemDb } from "./item";

export interface InquiryDb {
	id: number;
	inquirer: string;
	email: string;
	phone: string;
	item: Partial<ItemDb>;
	dateReservation: string;
	dateCreated: string;
	comment: string;
}

export class Inquiry {
	id: number | undefined
	inquirer: string | undefined;
	email: string | undefined;
	phone: string | undefined;
	item: Partial<ItemDb>;
	dateReservation: Date;
	dateCreated: Date;
	comment: string | undefined;

	filterSearch: string | undefined;

	constructor(obj?: InquiryDb) {
		this.id = obj?.id;
		this.inquirer = obj?.inquirer;
		this.email = obj?.email;
		this.phone = obj?.phone;
		this.item = obj?.item ?? {};
		this.dateReservation = obj ? new Date(obj.dateReservation) : new Date();
		this.dateCreated = obj ? new Date(obj.dateCreated) : new Date();
		this.comment = obj?.comment;

		this.filterSearch =  Object.keys(this).reduce((currentTerm: string, key: string) => {
			return currentTerm + (this as {[key: string]: any})[key] + '◬';
		}, '').toLowerCase();
	}
}
