import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {
  apikey = "3a1bfd7b92224f2c6eea3f1033892cd8";
  // https://api.themoviedb.org/3/tv/top_rated
  allTvs: any[] = [];

  getAllTvshows(pageNumber:number=1, language:string="en-US"): Observable<any>{
    return this.http.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apikey}&language=${language}&page=${pageNumber}`
      );
  }
  getTvById(tvId: number): Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${this.apikey}`);
  }

  searchAllTvs(tvTittle: string):Observable<any>{
    if (tvTittle == '') {
      return this.getAllTvshows();
    } else {
      return this.http.get(`https://api.themoviedb.org/3/search/tv?api_key=${this.apikey}&query=${tvTittle}`)
    }
  }
  constructor(private http:HttpClient) { }
}
