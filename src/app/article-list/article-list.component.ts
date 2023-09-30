import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../Services/articles.service';
import { FormControl } from '@angular/forms';


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

  AllArticles: Article[]=[];
  search!: string;
  myControl = new FormControl('', []);
  filteredArticles: Article[] = [];
  sortOrder: 'ascending' | 'descending' = 'ascending';

  constructor(private articleService: ArticlesService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((data) => {
      this.AllArticles = data.articles.slice(20, 40);
      this.filteredArticles = this.AllArticles
    });
    
  }

  onSearchChange() {
   
    const searchTerm = this.myControl.value.toLowerCase().trim();
    if (!searchTerm) {
      this.filteredArticles = this.AllArticles
    } else {
      this.filteredArticles = this.AllArticles.filter(
        (article) =>
          article.description.toLowerCase().includes(searchTerm) ||
          article.author.toLowerCase().includes(searchTerm) ||
          article.title.toLowerCase().includes(searchTerm)
      );
    }
  }

  sortByDateAscending() {
    this.filteredArticles.sort((a, b) => {
      const dateA: Date = new Date(a.publishedAt);
      const dateB: Date = new Date(b.publishedAt);
      return dateA.getTime() - dateB.getTime();
    });
  }
  
  sortByDateDescending() {
    this.filteredArticles.sort((a, b) => {
      const dateA: Date = new Date(a.publishedAt);
      const dateB: Date = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });
  }

  updateSorting() {
    if (this.sortOrder === 'ascending') {
      this.sortByDateAscending();
    } else {
      this.sortByDateDescending();
    }
  }
}






