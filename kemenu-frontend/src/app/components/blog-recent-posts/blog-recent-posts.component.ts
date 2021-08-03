import { Component, OnInit } from '@angular/core';
import BlogPost from '@models/blog-post/blogPost';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-recent-posts',
  templateUrl: './blog-recent-posts.component.html',
  styleUrls: ['./blog-recent-posts.component.scss']
})
export class BlogRecentPostsComponent implements OnInit {

  blogPageToShow: BlogPost[];
  private readonly MAXIMUM_POSTS = 5;
  
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.translate.get('blog').subscribe(blogPages => {
      this.blogPageToShow = blogPages[0].slice(0, this.MAXIMUM_POSTS);
    });
  }

}
