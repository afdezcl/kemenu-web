import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AlertsService } from '@services/alerts/alerts.service';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  isBrowser: boolean;

  constructor(
    private alertService: AlertsService,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.checkVerifyEmail();
    }
  }

  checkVerifyEmail() {
    this.alertService.clear();
    if (Object.is(localStorage.getItem('COOKIE-CONFIRMED-EMAIL'), 'true')) {
      this.alertService.success(this.translate.instant('Verify Email Success'));
    } else if (Object.is(localStorage.getItem('COOKIE-CONFIRMED-EMAIL'), 'false')) {
      this.alertService.error(this.translate.instant('Verify Email Error'));
    }
    localStorage.removeItem('COOKIE-CONFIRMED-EMAIL');
  }
}
