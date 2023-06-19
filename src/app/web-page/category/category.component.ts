import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  DataCategories:any[]=[];
  DataProducts:any[]=[];
  DataProducts_CT:any[]=[];
  inFoCT:any={};
  numberSwitch:boolean=true;
  constructor (
    private control:ServiceService
  ){
    this.control.getAllCt().subscribe((dataCT:any)=>{
      console.log(dataCT);
      this.DataCategories=dataCT;
    });
    this.control.getAllPr().subscribe((dataPrAll:any)=>{
      this.DataProducts=dataPrAll;
      console.log(dataPrAll);
      
    });
  };
  ShowAll(){
    this.numberSwitch=true;
  }
  CategoryPr(idCT:any){
    console.log(idCT);
    this.numberSwitch=false;
    this.DataProducts_CT=[];
    this.control.getOneCt(idCT).subscribe((dataCt:any)=>{
      this.inFoCT=dataCt.data;
      // console.log(this.inFoCT);
      dataCt.data.products.map((showArray:any)=>{
        this.DataProducts.map((idPr:any)=>{
          if(showArray==idPr._id){
            this.DataProducts_CT.push(idPr);
            console.log(this.DataProducts_CT);
          };
        });
      });
    });
    
    
  };
};
