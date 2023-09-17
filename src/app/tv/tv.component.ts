import { Component, OnInit } from '@angular/core';
import { TvshowsService } from '../tvshows.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent implements OnInit {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  allTvs:any[]=[];
  allData:any[]=[];
  lang:string = 'en-US';
  private searchval: string = '';
  currentPage: number = 1;
  totalTvs! :number;
  tvsPerPage:number=20;
  showTvDetails: boolean = true;

  set searchValue(value: string) {
    this.searchval = value;
    this.searchallTvs(value);
  }

  constructor(private tvServ: TvshowsService) {}

  ngOnInit(): void {
    this.tvServ.getAllTvshows(this.currentPage, this.lang).subscribe({next: (response)=>{
      this.allTvs=response.results;
      this.allData=this.allTvs;
      this.totalTvs=response.total_results;
    }});
  }

  toggleDetails(tvId: number) {
    console.log(tvId);
    
    for (const item of this.allTvs) {
      if (item.id == tvId) {
        item.toggleDiscription = !item.toggleDiscription;
      }
    }
  }

  searchallTvs(tvTittle: string) {
    this.tvServ.searchAllTvs(tvTittle).subscribe({next: (response)=>{
      this.allTvs=response.results;
      this.allData=this.allTvs
    }});
  }

  changeLanguage(){
    this.lang=this.lang=='en-US'?'ar-SA': 'en-US';
    this.tvServ.getAllTvshows(this.currentPage, this.lang).subscribe({next: (response)=>{
      this.allTvs=response.results;
      this.allData = this.allTvs;
    }});
  }
  changePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.tvServ.getAllTvshows(this.currentPage, this.lang).subscribe({
      next: (response) => {
        this.allTvs = response.results;
        this.allData = this.allTvs;
      },
    });
    
  }
}
