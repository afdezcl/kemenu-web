import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Demo } from '@models/demo-mock/demo.mock';
import { ShowMenu } from '@models/menu/showMenu.model';
import { Router } from '@angular/router';
import { MenuService } from '@services/menu/menu.service';
import { Section } from '@models/menu/section.model';
import { Dish } from '@models/menu/dish.model';
import { AllAllergens, Allergen } from '@models/menu/allergen.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public allergens: Allergen[] = AllAllergens;
  public menusSaved: ShowMenu[] = [];
  public cookieBASE64: string;
  public shortUrlId: string;
  public imageUrl: SafeResourceUrl;
  isBrowser: boolean;

  constructor(
    private router: Router,
    private menuService: MenuService,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      if (!Object.is(this.router.routerState.snapshot.url, '/demo')) {
        this.getDataToBuildMenu();
        this.menuService.getMenuById(this.shortUrlId)
          .subscribe((menusSaved: ShowMenu[]) => {
            this.menusSaved = this.matchAllergens(menusSaved);
          });
      } else {
        this.menusSaved = Demo;
      }
    }
  }

  getDataToBuildMenu() {
    if (this.isBrowser) {
      this.cookieBASE64 = localStorage.getItem('COOKIE-SHOW-MENU');
      const shortUrlId = atob(this.cookieBASE64);
      this.shortUrlId = shortUrlId;
      localStorage.setItem('shortUrlId', this.shortUrlId);
    }
  }

  matchAllergens(menusSaved: ShowMenu[]): ShowMenu[] {
    menusSaved.map((menu: ShowMenu) => {
      menu.sections.map((section: Section) => {
        section.dishes.map((dish: Dish) => {
          dish.allergens.map((allergen: Allergen) => {
            allergen.imageName = this.allergens.find(item => item.id === allergen.id).imageName;
          });
        });
      });
    });
    return menusSaved;
  }
}
