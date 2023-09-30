import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2023-09-29&to=2023-09-29&sortBy=popularity&apiKey=24a0fa50c24048ac99f37054b5cc9644`;

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  
  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<any[]> {
    return this.httpClient.get<any[]>(apiUrl);
  }

}

