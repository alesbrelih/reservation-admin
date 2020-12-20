import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { RefreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import localeSl from '@angular/common/locales/sl';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeSl);


@NgModule({
	declarations: [AppComponent],
	imports: [
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgxWebstorageModule.forRoot(),
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: RefreshTokenInterceptor,
		multi: true
	}, {
		provide: HTTP_INTERCEPTORS,
		useClass: JwtInterceptor,
		multi: true
	}, {
		provide: HTTP_INTERCEPTORS,
		useClass: HttpErrorInterceptor,
		multi: true
	}, {
		provide: LOCALE_ID, useValue: 'sl'
	}],
	bootstrap: [AppComponent],
})
export class AppModule {}
