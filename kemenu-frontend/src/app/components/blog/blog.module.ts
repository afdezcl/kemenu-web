import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlogComponent} from './blog.component';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogCardModule} from '../blog-card/blog-card.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    BlogRoutingModule,
    BlogCardModule
  ],
  exports: [
    BlogComponent
  ],
  declarations: [
    BlogComponent
  ]
})
export class BlogModule {
}
