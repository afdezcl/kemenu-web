import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BlogPostComponent } from './blog-post.component';
import { BlogPostRoutingModule } from './blog-post-routing.module';
import { BlogRecentPostsModule } from '../blog-recent-posts/blog-recent-posts.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    BlogPostRoutingModule,
    BlogRecentPostsModule
  ],
  declarations: [
    BlogPostComponent
  ]
})
export class BlogPostModule {
}
