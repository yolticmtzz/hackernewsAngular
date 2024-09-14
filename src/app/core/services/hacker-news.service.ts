import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
export interface Story {
  id: number;
  title: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  
  private apiUrl = environment.apiUrl + '/Stories/newest';
  constructor(private http: HttpClient) {}

  getStories(searchTerm: string | null = null, page: number, pageSize: number): Observable<Story[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())

if (searchTerm != null){
params.set('searchTerm', searchTerm);
}

      

    return this.http.get<Story[]>(this.apiUrl, { params });
  }
}