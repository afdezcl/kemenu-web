import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import BlogPost from '@models/blog-post/blogPost';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  @Input() blogPost: BlogPost;
  shortHtmlBody: string;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    this.shortHtmlBody = this.blogPost.htmlBody.substring(0, 51) + '...';
  }
}
