import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
// Ok done===================================>
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  DataAuthor:any={};
  InforAnonymous:any[]=[];
  DataSearch:any={
    value:"",
    option:"",
  };

  constructor(
    private controlUser:ServiceService,
    private idAdmin:ActivatedRoute,
  ){
    this.idAdmin.paramMap.subscribe((idAD:any)=>{
      const id=idAD.get("id");
      this.controlUser.GetOneAuthor(id).subscribe((dataAuthor:any)=>{
        this.DataAuthor=dataAuthor.data;
        this.DataAuthor.message.map((xem:any)=>{
          this.controlUser.AllAuthor().subscribe((dataUser:any)=>{
            dataUser.data.map((show:any)=>{
              if(show._id==xem.idUser){
                this.InforAnonymous.push(show);
                console.log(show);
                
              };
              // console.log(xem);
            });
          });
        });
      });
    });
  };
  Search(){

  }
};
