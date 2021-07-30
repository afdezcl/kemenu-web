import {Component, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import BlogPost from '@models/blog-post/blogPost';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blog;
  currentPage: number;
  blogPageToShow: BlogPost[];
  blogPages: number[];

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.get('blog').subscribe(blogPages => {
      this.blog = blogPages;
      this.currentPage = 0;
      this.blogPageToShow = this.blog[this.currentPage];
      this.blogPages = Array(this.blog.length).fill(1).map((x, i) => i + 1);
    });
    this.translate.onLangChange.subscribe((params: LangChangeEvent) => {
      this.blog = params.translations.blog;
      this.currentPage = 0;
      this.blogPageToShow = this.blog[this.currentPage];
      this.blogPages = Array(this.blog.length).fill(1).map((x, i) => i + 1);
    });
  }

  nextPage() {
    if (this.currentPage < this.blogPages.length - 1) {
      this.currentPage = this.currentPage + 1;
      this.blogPageToShow = this.blog[this.currentPage];
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;
      this.blogPageToShow = this.blog[this.currentPage];
    }
  }
}
