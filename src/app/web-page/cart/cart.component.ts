import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  UserOnline: any = {};
  UserAddCart: any[] = [];

  TotalPay: number = 0;
  constructor(
    private idUser: ActivatedRoute,
    private controlUser: ServiceService,
  ) {
    this.idUser.paramMap.subscribe((idU: any) => {
      const id = idU.get("id");
      this.controlUser.GetOneAuthor(id).subscribe((dataUser: any) => {
        this.UserOnline = dataUser.data;
        this.controlUser.getAllPr().subscribe((dataPr: any) => {
          dataPr.map((show1: any) => {
            this.UserOnline.cart.map((show2: any) => {
              if (show1._id == show2) {
                this.UserAddCart.push(show1);
              };
            });
          });
          // console.log(this.UserAddCart);// ok
        });
      });
    });
  };
  // Need Fixbug nowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
  ArrayTotalPay: any =0;
  ValueDola(event: any, showPr: any) {
    console.log(showPr);
    const IdPr=event.target.name;
    console.log(name);
    
    const quantity = event.target.value;
    const totalPrice = showPr.price * quantity;
      
    this.ArrayTotalPay=(totalPrice+this.ArrayTotalPay)-(this.ArrayTotalPay);
  }
  ResultPay() {
    console.log(this.ArrayTotalPay);
    alert("$ "+this.ArrayTotalPay)
  };
  removeCart(idCart: any) {
    this.UserOnline.cart = this.UserOnline.cart.filter((xem: any) => xem != idCart);
    console.log(this.UserOnline.cart);
    this.controlUser.updateAuthor(this.UserOnline).subscribe();
    location.reload();
    // Ok
  };

};
