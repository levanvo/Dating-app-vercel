import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-details-pr',
  templateUrl: './details-pr.component.html',
  styleUrls: ['./details-pr.component.scss']
})
export class DetailsPrComponent {
  DetailProducts:any={};// thông tin SP
  ProductsSimilar:any[]=[]; // SP liên quan
  UserOnline:any={};
  constructor (
    private infoId_Pr:ActivatedRoute,
    private getOnePr:ServiceService,
  ){
    this.infoId_Pr.paramMap.subscribe((idPr:any)=>{
      const id=idPr.get("id");
      this.getOnePr.getOnePr(id).subscribe((dataDetails:any)=>{
        this.DetailProducts=dataDetails.data;
        const date = new Date(this.DetailProducts.updatedAt);
        const formattedDate = `${date.getDate()}:${date.getMonth() + 1}:${date.getFullYear()}`;
        console.log(formattedDate);
        console.log(this.DetailProducts.updatedAt);
        this.getOnePr.getAllPr().subscribe((dataSimilar:any)=>{
          dataSimilar.map((xem:any)=>{
            this.DetailProducts.categoryID.products.map((idPr2:any)=>{
              if(xem._id==idPr2){
                this.ProductsSimilar.push(xem);
              };
            });
          });
        });
        console.log(this.DetailProducts.categoryID.products);
      });
    });
  };


  AddCart(idCart:any){
    console.log(idCart);
    this.getOnePr.AllAuthor().subscribe(({data}:any)=>{
      data.map((show:any)=>{
        if(show.status==true){
          this.UserOnline=show;//=====>get User Online
          // console.log(this.UserOnline);
          
          if(this.UserOnline.cart.length>0){
            let xemxet=0;
            // console.log(this.UserOnline.cart);
              this.UserOnline.cart.map((see:any)=>{
              if(see==idCart){
                xemxet=1;
                // console.log("trung "+ see +" va "+idCart);
              };
            });
            if(xemxet==0){
              this.UserOnline.cart.push(idCart);
              this.getOnePr.updateAuthor(this.UserOnline).subscribe();
              // console.log("OK");
              alert("Added your cart");
            };
          };
        };
      });
    });
  };

  
};
