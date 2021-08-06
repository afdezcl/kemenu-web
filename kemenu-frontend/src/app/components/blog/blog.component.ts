import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import BlogPost from '@models/blog-post/blogPost';
import { Router } from '@angular/router';

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

  constructor(private translate: TranslateService,    
    private router: Router) {
  }

  ngOnInit() {
    this.checkPage();
  }

  checkPage() {
    let page;
    this.router.events.subscribe(() => {
      let url = this.router.url;

      if(url.includes('blog') && !url.includes('page')) {
        this.getPosts(0);
      } else {
        page = url.substr(url.length - 1);
        this.getPosts(page - 1);
        window.scrollTo(0, 0);
      }
    });

    if(!page) {
      this.getPosts(0);
    }
  }

  getPosts(page) {
    this.translate.get('blog').subscribe(blogPages => {
      this.blog = blogPages;
      this.currentPage = page;
      this.blogPageToShow = this.blog[this.currentPage];
      this.blogPages = Array(this.blog.length).fill(1).map((x, i) => i + 1);
    });
  }

  onLanguageChange() {
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
      this.router.navigateByUrl(`blog/page/${this.currentPage+1}`)
      window.scrollTo(0, 0);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;    
      this.router.navigateByUrl(`blog/page/${this.currentPage+1}`)
      window.scrollTo(0, 0);
    }
  }

}
