import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRecentPostsComponent } from './blog-recent-posts.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardRecentPostComponent } from './card-recent-post/card-recent-post.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    BlogRecentPostsComponent, 
    CardRecentPostComponent
  ],
  exports: [
    BlogRecentPostsComponent
  ]  
})
export class BlogRecentPostsModule { }
