import { isPlatformBrowser } from '@angular/common';
import { Component, Input, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '@environments/environment';
import { Banner } from '@models/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements AfterViewInit {

  @Input() banner: Banner;
  showAd = environment.adsense.show;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        try {
          (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
            overlays: { bottom: true }
          });
        } catch (e) {
          console.error(e);
        }
      }, 0);
    }
  }

}
