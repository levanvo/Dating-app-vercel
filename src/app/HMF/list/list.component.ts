import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  KeyAccount:any=0;
  constructor (
    private router:ActivatedRoute,
  ){
    this.router.paramMap.subscribe(key=>this.KeyAccount=Number(key.get("id")));
    // console.log(this.KeyAccount);
    
  }
}
