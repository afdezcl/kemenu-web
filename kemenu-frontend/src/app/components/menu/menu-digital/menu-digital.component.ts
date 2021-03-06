import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Menu} from '@models/menu/menu.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {CreateSectionComponent} from './create-section/create-section.component';
import {Section, SectionIndex} from '@models/menu/section.model';
import {CreateDishComponent} from './create-dish/create-dish.component';
import {Dish, SectionDish} from '@models/menu/dish.model';
import {ConfirmDialogComponent} from '@ui-controls/dialogs/confirmDialog/confirmDialog.component';
import {TranslateService} from '@ngx-translate/core';
import {MenuService} from '@services/menu/menu.service';
import {AllAllergens, Allergen} from '@models/menu/allergen.model';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Currency} from '@models/menu/currency.interface';

@Component({
  selector: 'app-menu-digital',
  templateUrl: './menu-digital.component.html',
  styleUrls: ['./menu-digital.component.scss']
})
export class MenuDigitalComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() menu: Menu;
  @Output() menuChange: EventEmitter<Menu> = new EventEmitter<Menu>();
  public modalReference: BsModalRef;
  public businessId: string;
  public thereIsChange = false;
  public menuId: string;
  public currencies: Currency[];
  public allergens: Allergen[] = AllAllergens;
  public selectedValue: string;
  public sortMode: boolean;

  constructor(
    private modalService: BsModalService,
    private translate: TranslateService,
    private menuService: MenuService
  ) {
  }

  ngOnInit() {
    this.editMode = !!this.editMode;
    this.sortMode = false;
    if (this.editMode) {
      this.getCurrencies();
    }
    this.selectedValue = this.menu.currency ? this.menu.currency : 'EUR';
  }

  openCreateSection(event) {
    event.stopPropagation();
    event.preventDefault();
    this.modalReference = this.modalService.show(CreateSectionComponent);
    this.modalReference.content.messageEvent.subscribe(name => {
      this.addNewSection(name);
    });
  }

  getCurrencies() {
    this.menuService.getCurrencies()
      .subscribe((currencies: Currency[]) => {
        this.currencies = currencies.sort((a, b) => {
          return (a.isoCode > b.isoCode) ? 1 : (a.isoCode === b.isoCode) ? ((a.name > b.name) ? 1 : -1) : -1;
        });
      });
  }

  toggleSortMode(sortMode: boolean) {
    this.sortMode = !this.sortMode;
  }

  onCurrencyChange(isoCode: string) {
    this.menu.currency = isoCode;
    this.onSaveMenu();
  }

  private addNewSection(name: string) {
    const section = new Section(
      name,
      []
    );
    this.menu.sections.push(section);
    this.onSaveMenu();
  }

  deleteSection(sectionToRemove: Section) {
    const initialState = {
      title: this.translate.instant('Delete Section title'),
      message: this.translate.instant('Delete Section description')
    };

    this.modalReference = this.modalService.show(ConfirmDialogComponent, {initialState});
    this.modalReference.content.onClose.subscribe((canDelete: boolean) => {
      if (canDelete) {
        this.menu.sections = this.menu.sections.filter(section => section !== sectionToRemove);
        this.onSaveMenu();
      }
    });
  }

  editSection(event: Event, sectionToEdit: Section, sectionIndex: number) {
    this.stopOpenSection(event);
    const initialState = {
      name: sectionToEdit.name,
      editing: true
    };
    this.modalReference = this.modalService.show(CreateSectionComponent, {initialState});
    this.modalReference.content.messageEvent.subscribe(data => {
      this.menu.sections[sectionIndex].name = data;
      this.onSaveMenu();
    });
  }

  stopOpenSection(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  moveSection(event: Event, from, to) {
    this.stopOpenSection(event);
    if (to >= 0 && to <= this.menu.sections.length) {
      moveItemInArray(this.menu.sections, from, to);
    }
    this.onSaveMenu();
  }

  getSectionIcon(sectionName: string) {
    const icon = this.translate.instant(sectionName.substr(0, 3).toUpperCase());
    return icon ? icon : 'spoon-and-fork';
  }

  openCreateDish(sectionIndex: number) {
    const initialState = {
      editMode: this.editMode
    };
    this.modalReference = this.modalService.show(CreateDishComponent, {initialState});
    this.modalReference.content.messageEvent.subscribe(dish => {
      this.addNewDish(dish, sectionIndex);
      this.matchAllergens();
    });
  }

  private addNewDish(dish: Dish, sectionIndex: number) {
    this.menu.sections[sectionIndex].dishes.push(dish);
    this.onSaveMenu();
  }

  changeDishOrder(sectionIndex: SectionIndex) {
    this.menu.sections[sectionIndex.sectionIndex].dishes = sectionIndex.section.dishes;
    this.onSaveMenu();
  }

  deleteDish(dishToRemove: SectionDish) {
    const initialState = {
      title: this.translate.instant('Delete Dish title'),
      message: this.translate.instant('Delete Dish description'),
    };

    this.modalReference = this.modalService.show(ConfirmDialogComponent, {initialState});
    this.modalReference.content.onClose.subscribe((canDelete: boolean) => {
      if (canDelete) {
        this.menu.sections[dishToRemove.sectionIndex].dishes =
          this.menu.sections[dishToRemove.sectionIndex].dishes.filter(dish => dish !== dishToRemove.dish);
        this.onSaveMenu();
      }
      this.thereIsChange = true;
    });
  }

  editDish(dishToEdit: SectionDish) {
    const initialState = {
      name: dishToEdit.dish.name,
      description: dishToEdit.dish.description,
      price: dishToEdit.dish.price,
      selectedAllergens: dishToEdit.dish.allergens,
      imageUrl: dishToEdit.dish.imageUrl,
      available: !dishToEdit.dish.available,
      editMode: this.editMode,
      editing: true,
      formattedPrice: dishToEdit.dish.formattedPrice
    };
    this.modalReference = this.modalService.show(CreateDishComponent, {initialState});
    this.modalReference.content.messageEvent.subscribe(data => {
      this.menu.sections[dishToEdit.sectionIndex].dishes[dishToEdit.dishIndex] = data;
      this.matchAllergens();
      this.onSaveMenu();
    });
  }

  getActiveDishes(section: Section) {
    const activeDishes = [];
    for (const i in section.dishes) {
      if (section.dishes[i].available) {
        activeDishes.push(section.dishes[i]);
      }
    }
    return activeDishes;
  }

  onSaveMenu() {
    this.menuChange.emit(this.menu);
  }

  sanitizeAllergensMenuToUpdate() {
    const sections = this.menu.sections;
    sections.map((section: Section) => {
      section.dishes.map((dish: Dish) => {
        dish.allergens.map((allergen: Allergen) => delete allergen.imageName);
      });
    });
    return sections;
  }

  matchAllergens() {
    this.menu.sections.map((section: Section) => {
      section.dishes.map((dish: Dish) => {
        dish.allergens.map((allergen: Allergen) => {
          allergen.imageName = this.allergens.find(item => item.id === allergen.id).imageName;
        });
      });
    });
  }
}
