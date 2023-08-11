import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/services.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  ObjectAccount: any = {};//data account
  quantityFriend: any[] = [];// quantity friends
  ObjectChangePass: any = {
    passCr: "",
    email: "",
    passNew: "",
    rePass: "",
    showOkEmail: "",
  };//Object change password
  constructor(
    private router: ActivatedRoute,
    private controlUser: ServiceService,
  ) {
    this.router.paramMap.subscribe((idAccount: any) => {
      const id = Number(idAccount.get("id"));
      this.controlUser.getOneUser(id).subscribe((data1: any) => {
        this.ObjectAccount = data1;
        data1.arrayFriend.map((show: any) => {
          if (show.status == 3) {
            this.quantityFriend.push(show);
          };
        });
      });
    });
  };
  OnChangePass() {
    // check Email
    const xem = "@gmail.com";
    if (this.ObjectChangePass.email.includes(xem)) {
      this.ObjectChangePass.showOkEmail = "true";
    } else {
      this.ObjectChangePass.showOkEmail = "false";
    }
    // check before change password
    if (this.ObjectChangePass.rePass != this.ObjectChangePass.passNew) {
      alert("Password not match !?");
    }
    if (this.ObjectChangePass.passNew.length <= 4) {
      alert("Password to length > 4 !");
    }
    if (
      this.ObjectChangePass.passCr != "" &&
      this.ObjectChangePass.email != "" &&
      this.ObjectChangePass.showOkEmail == "true" &&
      this.ObjectChangePass.passNew != "" &&
      this.ObjectChangePass.passNew.length > 4 &&
      this.ObjectChangePass.rePass != "" &&
      this.ObjectChangePass.rePass == this.ObjectChangePass.passNew
    ) {
      let pass = CryptoJS.AES.decrypt(this.ObjectAccount.pass, 'okdi').toString(CryptoJS.enc.Utf8);
      if (this.ObjectChangePass.passCr == pass && this.ObjectChangePass.email == this.ObjectAccount.email) {
        pass = CryptoJS.AES.encrypt(this.ObjectChangePass.passNew, 'okdi').toString();
        this.ObjectAccount.pass = pass;
        this.ObjectAccount.confirmpass = this.ObjectChangePass.passNew;
        this.controlUser.updateUser(this.ObjectAccount).subscribe();
        alert("Update password successfully !");
        location.reload();
      } else {
        alert("Password currently or your email wrong !");
      }
    }
  }
  ErrorInfo: any = {
    emailCheck: "",
  }
  OnChangeInfo() {
    const endEmail = "@gmail.com";
    if (
      this.ObjectAccount.name != "" &&
      this.ObjectAccount.gender != "" &&
      this.ObjectAccount.city != "" &&
      this.ObjectAccount.country != "" &&
      this.ObjectAccount.email != "" &&
      this.ObjectAccount.dateOfbirth != "" &&
      this.ObjectAccount.describes != ""
    ) {
      if (this.ObjectAccount.email.includes(endEmail)) {
        const nowDay = new Date();
        let nowYear = nowDay.getFullYear();
        let getYourAge = Number(this.ObjectAccount.dateOfbirth.slice(0, 4));
        this.ObjectAccount.age=nowYear-getYourAge;
        this.controlUser.updateUser(this.ObjectAccount).subscribe();
        alert("Update your info successfully !");
        location.reload();
      } else {
        this.ErrorInfo.emailCheck = "false";
      };
    };
    // console.log(this.ObjectAccount.dateOfbirth);

  };
};
// const encryptedText = CryptoJS.AES.encrypt('Hello, World!', 'vole').toString();
// const decryptedText = CryptoJS.AES.decrypt(encryptedText, 'vole').toString(CryptoJS.enc.Utf8);