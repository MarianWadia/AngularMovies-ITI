import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvshowsService } from '../tvshows.service';

@Component({
  selector: 'app-tvdetails',
  templateUrl: './tvdetails.component.html',
  styleUrls: ['./tvdetails.component.css']
})
export class TvdetailsComponent implements OnInit {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
   selectedtv:any;

  constructor(private route: ActivatedRoute, private tvServ: TvshowsService) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.tvServ.getTvById(id).subscribe({next:(response)=>{
      this.selectedtv = response;
    }})
  }

}
