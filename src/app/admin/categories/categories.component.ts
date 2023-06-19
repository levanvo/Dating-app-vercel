import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
// Ok done===================================>
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  DataCategory:any[]=[];
  NameList:any={
    nameList:"",
  };
  // update
  ObjectUDCategory: any = {
    id:"",
    nameList: "",
  };
  constructor(
    private controlCT:ServiceService,

  ){
    this.controlCT.getAllCt().subscribe((dataCT:any)=>{
      this.DataCategory=dataCT;
    });
  };

  OnAddCt(){
    let ok=0;
    console.log(this.NameList.nameList);
    if(this.NameList.nameList && this.NameList.nameList!=" "){
      // this.controlCT.getAllCt().subscribe((dataCT:any)=>{
      //   dataCT.map((show:any)=>{
      //     if(show.nameList!=this.NameList.nameList){
      //       ok=1;
      //     };
      //   });
        // if(ok==1){
          this.controlCT.addCt(this.NameList).subscribe();
          alert("Added list successfully !");
          location.reload();
        // }
      // });
      
      
    }else{
      alert("Empty ?")
    };
  };
  RemoveCt(idCt:any){
    const see=window.confirm("Remove !,it already has affiliate products !!");
    if(see){
      this.controlCT.getOneCt(idCt).subscribe((dataCtt:any)=>{
        dataCtt.data.products.map((getArrayPr:any)=>{
          this.controlCT.getOnePr(getArrayPr).subscribe((dataPr:any)=>{
            console.log(dataPr);
            this.controlCT.removePr(getArrayPr).subscribe();
            this.controlCT.removeCt(idCt).subscribe();
            location.reload();
            alert("Remove successfully !");
          });
        });
      });
    };
  };
  UpdateCt1(idCt:any){
    this.controlCT.getOneCt(idCt).subscribe((dataOne:any)=>{
      this.ObjectUDCategory.nameList=dataOne.data.nameList;
      this.ObjectUDCategory.id=idCt;
    });
  }
  UpdateCt2(){
    console.log(this.ObjectUDCategory);
    if(this.ObjectUDCategory.nameList && this.ObjectUDCategory.nameList!=" "){
      let iddCt=this.ObjectUDCategory.id;
      let objectNew2={
        nameList:this.ObjectUDCategory.nameList,
      }
      this.controlCT.updateCt(objectNew2,iddCt).subscribe();
      alert("Update list successfully !");
      location.reload();
    }else{
      alert("Empty ?")
    };
  }
};
