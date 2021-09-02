import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Demo } from '@models/demo-mock/demo.mock';
import { ShowMenu } from '@models/menu/showMenu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '@services/menu/menu.service';
import { Section } from '@models/menu/section.model';
import { Dish } from '@models/menu/dish.model';
import { AllAllergens, Allergen } from '@models/menu/allergen.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Banner } from '@models/banner';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public allergens: Allergen[] = AllAllergens;
  public menusSaved: ShowMenu[] = [];
  public shortUrlId: string;
  public imageUrl: SafeResourceUrl;
  isBrowser: boolean;
  banner: Banner;
  isDemo: boolean;

  constructor(
    private router: Router,
    private menuService: MenuService,
    @Inject(PLATFORM_ID) platformId: any,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.banner = new Banner(
      'ca-pub-9431323762190837',
      9196178952,
      'auto',
      true
    );
  }

  ngOnInit() {
    if (!Object.is(this.router.routerState.snapshot.url, '/demo')) {
      this.isDemo = false;
      this.getDataToBuildMenu();
      this.menuService.getMenuById(this.shortUrlId)
        .subscribe((menusSaved: ShowMenu[]) => {
          this.menusSaved = this.matchAllergens(menusSaved);
        });
    } else {
      this.isDemo = true;
      this.menusSaved = Demo;
    }
  }

  getDataToBuildMenu() {
    this.route.params.subscribe(params => {
      this.shortUrlId = params['id'];
    });
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
