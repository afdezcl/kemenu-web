import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {BlogCardComponent} from './blog-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [BlogCardComponent],
  exports: [BlogCardComponent]
})
export class BlogCardModule {
}
