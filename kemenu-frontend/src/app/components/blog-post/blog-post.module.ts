import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlogPostComponent} from './blog-post.component';
import {BlogPostRoutingModule} from './blog-post-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    BlogPostRoutingModule
  ],
  exports: [
    BlogPostComponent
  ],
  declarations: [
    BlogPostComponent
  ]
})
export class BlogPostModule {
}
