import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import axios from "axios";
// Ok done===================================>
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  DataProducts: any[] = [];//tất cả SP
  id:any="";
  // add
  ObjectProducts: any = {
    name: "",
    price: 0,
    image: "https://picsum.photos/300",
    quantity: 0,
    description: "",
    categoryID: "",
  };
  // update
  ObjectUDProducts: any = {
    name: "",
    price: 0,
    image: "https://picsum.photos/300",
    quantity: 0,
    description: "",
    categoryID: "",
  };
  IdPr:any="";
  FileImage: any = {};
  ImageUpload: any = "";
  DataCategory: any[] = [];

  constructor(
    private controlPr: ServiceService,
  ) {
    this.controlPr.getAllPr().subscribe((dataPr: any) => {
      this.DataProducts = dataPr;
    });
    this.controlPr.getAllCt().subscribe((dataPr: any) => {
      this.DataCategory = dataPr;
      console.log(dataPr);
    });
  };

  HandleImage(image2: any) {
    let Image = image2.target.files[0];
    this.FileImage = Image;
    console.log(Image);
  }
  async OnAddPr() {
    // console.log(this.FileImage);
    const cloudName = "darnprw0q";
    const PresetName = "vole_2k";
    const FolderName = "test";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const upImage = new FormData();

    upImage.append("upload_preset", PresetName);
    upImage.append("folder", FolderName);
    upImage.append("file", this.FileImage);
    const get_image = await axios.post(api, upImage, {
      headers: {
        "Content-Type": "multiple/form-data",
      },
    });
    this.ImageUpload = get_image.data.secure_url;
    console.log(this.ImageUpload);
    this.ObjectProducts.image = this.ImageUpload;
    if (
      this.ObjectProducts.name &&
      this.ObjectProducts.price &&
      this.ObjectProducts.image &&
      this.ObjectProducts.quantity &&
      this.ObjectProducts.description &&
      this.ObjectProducts.categoryID
    ) {

      this.controlPr.addPr(this.ObjectProducts).subscribe();
      alert("Add product successfully !")
      location.reload();
    } else {
      alert("Fill in the data fields (price > 0 and quantity > 0");
    };
    console.log(this.ObjectProducts);

  };
  RemovePr(idPr: any) {

    this.controlPr.getOnePr(idPr).subscribe((dataPrr: any) => {
      const see = window.confirm("Remove: " + dataPrr.data.name + " ?");
      if (see) {
        this.controlPr.removePr(idPr).subscribe();
        location.reload();
        alert("Remove successfully PR: " + dataPrr.data.name + " !");
      };
    });
  };
  UpdatePr1(idPr:any){
    this.controlPr.getOnePr(idPr).subscribe((dataOne:any)=>{
      this.ObjectUDProducts.name=dataOne.data.name;
      this.ObjectUDProducts.price=dataOne.data.price;
      this.ObjectUDProducts.image=dataOne.data.image;
      this.ObjectUDProducts.quantity=dataOne.data.quantity;
      this.ObjectUDProducts.description=dataOne.data.description;
      this.ObjectUDProducts.categoryID=dataOne.data.categoryID;
      this.IdPr=idPr;
    });
  };
  async UpdatePr2(){
    console.log(this.ObjectUDProducts);
    const cloudName = "darnprw0q";
    const PresetName = "vole_2k";
    const FolderName = "test";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const upImage = new FormData();

    upImage.append("upload_preset", PresetName);
    upImage.append("folder", FolderName);
    upImage.append("file", this.FileImage);
    const get_image = await axios.post(api, upImage, {
      headers: {
        "Content-Type": "multiple/form-data",
      },
    });
    this.ImageUpload = get_image.data.secure_url;
    console.log(this.ImageUpload);
    this.ObjectUDProducts.image = this.ImageUpload;
    console.log(this.ObjectUDProducts);

    if (Object.keys(this.ObjectUDProducts).some(key1 => this.ObjectUDProducts[key1] == "")) {
      alert("Form empty ?");
    } else {
      this.controlPr.updatePr(this.ObjectUDProducts,this.IdPr).subscribe();
      alert("Update SP completed");
      location.reload();
    };
  };
};
