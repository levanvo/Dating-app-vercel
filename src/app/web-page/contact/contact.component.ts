import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  ObjectContact:any={
    idUser:"",
    name:"",
    image:"",
    email:"",
    phone:"",
    message:""
  };
  ObjectAdmin:any={};
  ObjectUser:any={};
  constructor(
    private controlAuthor:ServiceService,
  ){
    this.controlAuthor.AllAuthor().subscribe((dataAuthor:any)=>{
      dataAuthor.data.map((show:any)=>{
        if(show.role=="admin"){
          this.ObjectAdmin=show;
        };
        if(show.status==true){
          this.ObjectUser=show;
        }
      });
    });
  };

  OnContact(){
    console.log(this.ObjectContact);
    this.ObjectContact.idUser=this.ObjectUser._id;
    this.ObjectContact.image=this.ObjectUser.image;
    if (Object.keys(this.ObjectContact).some(key1 => this.ObjectContact[key1] == "")) {
      alert("Form empty ?");
    }else{
      
      // this.ObjectContact.message="";
      this.ObjectAdmin.message.push(this.ObjectContact);
      this.controlAuthor.updateAuthor(this.ObjectAdmin).subscribe();
      alert("Thanks for your feedback !");
      location.reload();
    };
  };
};
