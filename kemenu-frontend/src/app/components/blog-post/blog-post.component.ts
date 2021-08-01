import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  blog;

  constructor(private translate: TranslateService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const urlPost = this.activatedRoute.snapshot.paramMap.get('blog');
    this.translate.get('blog').subscribe(blogPages => {
      for (const blogPage of blogPages) {
        for (const blogPost of blogPage) {
          if (blogPost.url === urlPost) {
            this.blog = blogPost;
            return;
          }
        }
      }
    });
  }
}
