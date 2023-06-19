import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  DataProducts:any[]=[];//tất cả SP
  DataProductsLimit1:any[]=[];// SP limit Latest Collection 2023
  DataProductsLimit2:any[]=[];
  DataCategories:any[]=[];// tất cả danh mục
  DataUsers:any[]=[];// tất cả người dùng (bao gồm admin)
  UserOnline:any={};

  constructor(
    private controlProducts:ServiceService,
  ){
    // Products
    this.controlProducts.getAllPr().subscribe((dataPr:any)=>{
      this.DataProducts=dataPr;
      this.controlProducts.getAllPrLimit(dataPr.length>7?7:dataPr.length,1,"desc").subscribe((dataPrLimit1:any)=>{
        this.DataProductsLimit1=dataPrLimit1.docs;
        // console.log(this.DataProductsLimit1);
      });
      this.controlProducts.getAllPrLimit(dataPr.length>9?9:dataPr.length,1,"asc").subscribe((dataPrLimit2:any)=>{
        this.DataProductsLimit2=dataPrLimit2.docs;
        // console.log(this.DataProductsLimit2);
      });
    });
    // Categories
    this.controlProducts.getAllCt().subscribe((dataCt:any)=>{
      this.DataCategories=dataCt;
    });
    // Author
    this.controlProducts.AllAuthor().subscribe((dataUsers:any)=>{
      this.DataUsers=dataUsers;
    });
  };


  AddCart(idCart:any){
    console.log(idCart);
    
    this.controlProducts.AllAuthor().subscribe(({data}:any)=>{
      data.map((show:any)=>{
        if(show.status==true){
          this.UserOnline=show;//=====>get User Online
          // console.log(this.UserOnline);
          
          // if(this.UserOnline.cart.length>0){
            let xemxet=0;
              this.UserOnline.cart.map((see:any)=>{
              if(see==idCart){
                xemxet=1;
                // console.log("trung "+ see +" va "+idCart);
              };
            });
            if(xemxet==0){
              this.UserOnline.cart.push(idCart);
              this.controlProducts.updateAuthor(this.UserOnline).subscribe();
              alert("Added your cart");
            };
          // };
        };
      });
    });
  };

};
