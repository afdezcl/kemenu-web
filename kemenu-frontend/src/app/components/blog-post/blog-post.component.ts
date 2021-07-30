import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  @Input() title: string;
  @Input() date: string;
  @Input() headerImage: string;
  @Input() htmlBody: string;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {

  }
}
