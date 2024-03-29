import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterModule } from './components/footer/footer.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './ui-controls/interceptor/auth.interceptor';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
// NGX-BOOTSTRAP
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';

// Translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@environments/environment';
import { UploadImageButtonModule } from './components/uploadImageButton/uploadImageButton.module';
import { CookiesBannerModule } from './components/cookies-banner/cookies-banner.module';
import { ModalPolicyModule } from './components/modal-policy/modal-policy.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaV3Module,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    // My modules
    NavbarModule,
    FooterModule,
    UploadImageButtonModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    CookiesBannerModule,
    ModalPolicyModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaToken }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
