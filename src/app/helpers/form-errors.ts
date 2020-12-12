import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class FormErrors {
	/** Error when invalid control is dirty, touched, or submitted. */
	public static getErrorMatcher(): ErrorStateMatcher {
		return {
			isErrorState(
				control: FormControl | null,
				form: FormGroupDirective | NgForm | null
			): boolean {
				const isSubmitted = form && form.submitted;
				return !!(
					control &&
					control.invalid &&
					(control.dirty || control.touched || isSubmitted)
				);
			}
		}
	}
}
