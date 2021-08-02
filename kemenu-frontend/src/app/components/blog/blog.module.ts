import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {BlogComponent} from './blog.component';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogCardModule} from '../blog-card/blog-card.module';
import { BlogRecentPostsModule } from '../blog-recent-posts/blog-recent-posts.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    BlogRoutingModule,
    BlogCardModule,
    BlogRecentPostsModule
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
