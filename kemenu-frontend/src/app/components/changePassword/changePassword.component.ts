import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertsService } from '@services/alerts/alerts.service';
import { Subscription } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ChangePassword, ForgotPasswordId } from '@models/auth/changePassword.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css'],
  providers: [AlertsService, ReCaptchaV3Service, AuthenticationService]
})

export class ChangePasswordComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  changePasswordForm: FormGroup;
  forgotPasswordId: ForgotPasswordId;

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private alertService: AlertsService,
    private authService: AuthenticationService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const forgotPasswordEmail = params['id'];
      if (forgotPasswordEmail) {
        const forgotPasswordIdString: string = decodeURI(forgotPasswordEmail);
        this.forgotPasswordId = JSON.parse(forgotPasswordIdString);
      }
    });
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatedPassword: ['']
    }, { validators: this.checkPasswords });
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
