import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormErrors } from 'src/app/helpers/form-errors';

export interface Login {
	username: string;
	password: string;
}

@Component({
	selector: 'app-login',
	templateUrl: './login.view.html',
	styleUrls: ['./login.view.scss'],
})
export class LoginView implements OnInit {
	disabledSubmit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	matcher = FormErrors.getErrorMatcher();
	formGroup!: FormGroup;

	constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	login(login: Login): void {
		this.disabledSubmit$.next(true);
		this.auth.login(login)
			.pipe(
				finalize(() => this.disabledSubmit$.next(false))
			).subscribe(() => {
				this.router.navigate(['/']);
			}, err => {
				//TODO: add real err service/logger
				console.error(err);
			});
	}
}
