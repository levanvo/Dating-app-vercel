import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';


@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.component.html',
  styleUrls: ['./web-page.component.scss']
})
export class WebPageComponent {
  ValueSearch: string = "";//value search
  DataUser_Signin_up: any = {
    o: "ok"
  };

  constructor(
    private http: ServiceService,
  ) {
    this.http.AllAuthor().subscribe((dataAuthor: any) => {
      dataAuthor.data.map((itemUser: any) => {
        if (itemUser.status == true) {
          this.DataUser_Signin_up = itemUser;
          // console.log(itemUser);
        };
      });
    });
  };
  Search() {
    console.log(this.DataUser_Signin_up.role);
    
    // this.ValueSearch.replace(" ","");
    // this.ValueSearch.length
    console.log(this.ValueSearch.length);
    this.http.getAllPr().subscribe((data1:any)=>{
      data1.map((data2:any)=>{
        // data2.name.replace(" ","");
        if(this.ValueSearch.toLowerCase()==data2.name.toLowerCase()){
          window.location.href="details/"+data2._id;
        };
      });
    });
  };
  LogOut(idLogOut: any) {
    const consider = window.confirm("Are you sure !");
    if (consider) {
      this.http.GetOneAuthor(idLogOut).subscribe((dataOne: any) => {
        console.log(dataOne.data.status);
        dataOne.data.status = false;
        this.http.updateAuthor(dataOne.data).subscribe();
        window.location.href="";
      });
    };
  };






};
