import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Services/services.service';
import { ActivatedRoute } from '@angular/router';
import axios from "axios";

@Component({
  selector: 'app-your-images',
  templateUrl: './your-images.component.html',
  styleUrls: ['./your-images.component.scss']
})
export class YourImagesComponent {
  // ================Image handle
  ObjectImage: any[] = [];//info images upload -> main
  ArrayImageUpload: any[] = [];//info images after upload -> main
  ArrayImageSize: any = "";
  ArrayImageOverView: any[] = [];//show info overView
  // ================Account
  ObjectAccount: any = {};
  constructor(
    private controllUser: ServiceService,
    private router: ActivatedRoute,
  ) {
    this.router.paramMap.subscribe((idAccount: any) => {
      const id = Number(idAccount.get("id"));
      this.controllUser.getOneUser(id).subscribe((data: any) => {
        this.ObjectAccount = data;
      });
    });
  };
  HandleImage(image: any) {
    let size = 0;
    this.ObjectImage.push(image.target.files);
    for (let i = 0; i < this.ObjectImage[0].length; i++) {
      size += this.ObjectImage[0][i].size;
      this.ArrayImageOverView.push(this.ObjectImage[0][i].name);
    }
    this.ArrayImageSize = ((size / (1024 * 1024)).toFixed(2));
  };
  async UploadImage() {
    console.log(this.ObjectImage[0]);
    const cloudName = "darnprw0q";
    const PresetName = "vole_2k";
    const FolderName = "test";
    const all_image = [];
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const upImage = new FormData();

    upImage.append("upload_preset", PresetName);
    upImage.append("folder", FolderName);
    for (const file of this.ObjectImage[0]) {
      console.log(file);
      upImage.append("file", file);
      const get_image = await axios.post(api, upImage, {
        headers: {
          "Content-Type": "multiple/form-data",
        },
      });
      all_image.push(get_image.data.secure_url);
      this.ArrayImageUpload = all_image;
    };
    console.log(this.ArrayImageUpload);
    this.ObjectAccount.arrayImage = [...this.ObjectAccount.arrayImage, ...this.ArrayImageUpload];
    this.controllUser.updateUser(this.ObjectAccount).subscribe();
    location.reload();
    if (this.ArrayImageUpload.length < 1) {
      alert("No more image !");
    } else {
      alert("Upload images succesfully !");
    }

    console.log(this.ObjectAccount);
  };
  // image main or remove it
  setImage(img: any) {
    // alert(img);
    const confirm = window.confirm("Set for your profile !");
    if (confirm) {
      this.ObjectAccount.image = img;
      this.controllUser.updateUser(this.ObjectAccount).subscribe();
      location.reload();
    };
  };
  removeImage(img: string) {
    const confirm = window.confirm("Remove this image ?");
    if (confirm) {
      this.ObjectAccount.arrayImage = this.ObjectAccount.arrayImage.filter((item: any) => item != img);
      this.controllUser.updateUser(this.ObjectAccount).subscribe();
    };
  };
};
