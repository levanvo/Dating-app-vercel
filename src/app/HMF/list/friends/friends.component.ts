import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  KeyAccount: any = 0;
  constructor(
    private router: ActivatedRoute,
  ) {
    this.router.paramMap.subscribe(key => this.KeyAccount = Number(key.get("id")));
    // console.log(this.KeyAccount);

  }


  
}
