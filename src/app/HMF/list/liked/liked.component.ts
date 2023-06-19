import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/services.service';
import { ILogin } from 'src/app/typeUser';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss']
})
export class LikedComponent {
  KeyAccount: any = 0;
  AllUserBelike:ILogin[]=[];//BELIKE
  AllUserliked:ILogin[]=[];//LIKE
  constructor(
    private router: ActivatedRoute,
    private controllUser:ServiceService,
  ) {
    this.router.paramMap.subscribe(key => this.KeyAccount = Number(key.get("id")));
    // get Like and Belike
    this.controllUser.getOneUser(this.KeyAccount).subscribe((data:any)=>{
      data.switchLove.map((item:any)=>{
        this.controllUser.getOneUser(item).subscribe((data:any)=>{
          this.AllUserliked.push(data);
        });
      });
      data.arrayBeLike.map((item:any)=>{
        this.controllUser.getOneUser(item).subscribe((data:any)=>{
          this.AllUserBelike.push(data);
        });
      });
    });
  };









};
