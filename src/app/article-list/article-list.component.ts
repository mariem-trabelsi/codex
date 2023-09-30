import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../Services/articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  AllArticles :any[]=[]
  constructor(private articleService :ArticlesService) { }

  ngOnInit(): void {
  }

  getArticles() {
    this.articleService.getArticles().subscribe( (data) =>{
      this.AllArticles = data
       console.log(this.AllArticles)
    }
       
    )
  }
}
