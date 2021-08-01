import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {BlogPostComponent} from './blog-post.component';
import {BlogPostRoutingModule} from './blog-post-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    BlogPostRoutingModule
  ],
  declarations: [
    BlogPostComponent
  ]
})
export class BlogPostModule {
}
