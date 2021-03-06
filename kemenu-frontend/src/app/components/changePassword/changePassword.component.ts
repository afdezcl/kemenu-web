import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertsService } from '@services/alerts/alerts.service';
import { Subscription } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ChangePassword, ForgotPasswordId } from '@models/auth/changePassword.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css'],
  providers: [AlertsService, ReCaptchaV3Service, AuthenticationService]
})

export class ChangePasswordComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  changePasswordForm: FormGroup;
  cookieBASE64: string;
  forgotPasswordId: ForgotPasswordId;
  isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private alertService: AlertsService,
    private authService: AuthenticationService,
    private recaptchaV3Service: ReCaptchaV3Service,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.getDataToBuildForgotPassword();
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatedPassword: ['']
    }, { validators: this.checkPasswords });
  }

  getDataToBuildForgotPassword() {
    if (this.isBrowser) {
      this.cookieBASE64 = localStorage.getItem('FORGOT-PASSWORD-EMAIL');
      const forgotPasswordIdString: string = atob(this.cookieBASE64);
      localStorage.setItem('forgotPasswordId', forgotPasswordIdString);
      this.forgotPasswordId = JSON.parse(forgotPasswordIdString);
    }
  }

  get form() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    this.changePassword();
  }

  private changePassword(): void {
    this.subscription = this.recaptchaV3Service.execute('login')
      .subscribe((token) => this.registerAttempt(token));
  }

  private registerAttempt(token: string) {
    const changePassword: ChangePassword = {
      password: this.form.password.value,
      repeatedPassword: this.form.repeatedPassword.value,
      recaptchaToken: token
    };
    this.alertService.clear();
    this.authService.changePassword(this.forgotPasswordId, changePassword)
      .subscribe(() => {
        this.changePasswordForm.reset();
        localStorage.removeItem('FORGOT-PASSWORD-EMAIL');
        localStorage.removeItem('forgotPasswordId');
        this.alertService.success(this.translate.instant('ConfirmPasswordChanged'));
      },
        (error) => {
          this.alertService.error(this.translate.instant('ErrorChangingPassword'));
        }
      );

  }

  checkPasswords(form: FormGroup) {
    const password = form.controls.password.value;
    const repeatedPassword = form.controls.repeatedPassword.value;

    return password === repeatedPassword ? null : { notSame: true };
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
