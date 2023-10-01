import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../Services/articles.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


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
  favoris :Article[]=[];
  search!: string;
  myControl = new FormControl('', []);
  filteredArticles: Article[] = [];
  sortOrder: 'ascending' | 'descending' = 'ascending';
  isBookmarked = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  l! :any; 
  itemsPerPage = 5; 
  currentPage = 1;
  mathUtil = Math;

  constructor(private articleService: ArticlesService,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((data) => {
      this.AllArticles = data.articles;
      this.filteredArticles = this.AllArticles
    });
    
  }

  onSearchChange() {
   
    const searchTerm = this.myControl.value.toLowerCase().trim();
    if (!searchTerm) {
      {
        this.l= ""
        this.filteredArticles = this.AllArticles }
    } else {
      this.filteredArticles = this.AllArticles.filter(
        (article) =>
          article.description.toLowerCase().includes(searchTerm) ||
          article.author.toLowerCase().includes(searchTerm) ||
          article.title.toLowerCase().includes(searchTerm)
      );
       this.l = this.filteredArticles.length

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

  toggleBookmark(index:any) {
    this.isBookmarked = !this.isBookmarked;
    if(this.isBookmarked){
     this.favoris.push(this.AllArticles[index])
     this.openSnackBar();
    }
   else
    {this.favoris.splice(index, 1)
    this.openSnackBar1();
    console.log(this.favoris);
    }
  }

  openSnackBar() {
    this._snackBar.open(' New article is saved!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSnackBar1() {
    this._snackBar.open(' This article is removed!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
  }
 
 
}






