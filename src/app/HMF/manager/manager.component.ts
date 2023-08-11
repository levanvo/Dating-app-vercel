import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from "../../Services/services.service"
import { ILogin } from 'src/app/typeUser';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {
  KeyAccount: any = 0;
  InfoUser:any={};
  constructor(
    private router: ActivatedRoute,
    private controlUser: ServiceService
  ) {
    this.router.paramMap.subscribe((keyUser) => {
      this.KeyAccount = Number(keyUser.get("id"));
      // console.log(this.KeyAccount);
    });
    this.controlUser.getOneUser(this.KeyAccount).subscribe((takeData:any)=>{
      this.InfoUser=takeData;
    });
  };
  };
