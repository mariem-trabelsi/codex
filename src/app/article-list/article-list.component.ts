import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../Services/articles.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
}

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  AllArticles! : Article[];
  search!: string;
  myControl = new FormControl('', []);
  filteredOptions!: Observable<Article[]>;
  constructor(private articleService :ArticlesService) { }

  ngOnInit(): void {
    this.getArticles()  
  }

  getArticles() {
    this.articleService.getArticles().subscribe( (data) =>{
      this.AllArticles = data.articles.slice(20,40)
       console.log(this.AllArticles)
    })
  }

 filter (value: string): Article[] {
  const filterValue = value.toLowerCase();
  return this.AllArticles.filter(
    (article) =>
    article.description.toLowerCase().includes(filterValue) ||
    article.author.toLowerCase().includes(filterValue)||
    article.title.toLowerCase().includes(filterValue)
  );
}
}
