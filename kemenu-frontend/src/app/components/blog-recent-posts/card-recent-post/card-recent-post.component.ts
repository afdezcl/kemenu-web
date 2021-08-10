import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import BlogPost from '@models/blog-post/blogPost';


@Component({
  selector: 'app-card-recent-post',
  templateUrl: './card-recent-post.component.html',
  styleUrls: ['./card-recent-post.component.scss']
})
export class CardRecentPostComponent implements OnInit {

  @Input() blogPost: BlogPost;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToPost() {
    this.router.navigateByUrl(`/blog/${this.blogPost.url}`);
  }

}
