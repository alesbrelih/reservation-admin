export interface AcceptedDb {
	id: number;
	inquirer: string;
	inquirerEmail: string;
	inquirerPhone: string;
	itemId: number;
	itemTitle: string;
	itemPrice: number; // in cents
	dateReservation: string;
}

export class Accepted {
	id: number | undefined;
	inquirer: string | undefined;
	inquirerEmail: string | undefined;
	inquirerPhone: string | undefined;
	itemId: number | undefined;
	itemTitle: string | undefined;
	itemPrice: number | undefined; // in cents
	dateReservation: Date;

	filterSearch: string | undefined;

	constructor(obj?: AcceptedDb) {
		this.id = obj?.id;
		this.inquirer = obj?.inquirer;
		this.inquirerEmail = obj?.inquirerEmail;
		this.inquirerPhone = obj?.inquirerPhone;
		this.itemId = obj?.itemId;
		this.itemTitle = obj?.itemTitle;
		this.itemPrice = obj?.itemPrice;
		this.dateReservation = obj ? new Date(obj.dateReservation) : new Date();

		this.filterSearch =  Object.keys(this).reduce((currentTerm: string, key: string) => {
			// Use an obscure Unicode character to delimit the words in the concatenated string.
			// This avoids matches where the values of two columns combined will match the user's query
			// (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
			// that has a very low chance of being typed in by somebody in a text field. This one in
			// particular is "White up-pointing triangle with dot" from
			// https://en.wikipedia.org/wiki/List_of_Unicode_characters
			return currentTerm + (this as {[key: string]: any})[key] + '◬';
		  }, '').toLowerCase();

	}
}
