import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Services/services.service';
import { ILogin } from 'src/app/typeUser';
import * as CryptoJS from "crypto-js"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  arrayAllUser: ILogin[] = [];
  // arrayAllAccess: any = 0;
  objectStatusUser = false;
  takeOneUser: any = {};
  constructor(
    private LoginLogout: ServiceService,
  ) {
    this.LoginLogout.getAllUser().subscribe((data) => {
      this.arrayAllUser = data;
      // console.log(data);
      data.map((takeUserLogin) => {
        if (takeUserLogin.status == true) {
          this.takeOneUser = takeUserLogin;
          this.objectStatusUser = takeUserLogin.status;
        };
      });
    });
  };
  // object value Login
  objectLogin = {
    email: "",
    pass: "",
  };
  ErrorLogin = "";
  onLogin() {
    this.arrayAllUser.map((show: any) => {
      console.log("showPass");
      // decode Password.
      let showPass: any[] = [];
      showPass.push(CryptoJS.AES.decrypt(show.pass, "okdi").toString(CryptoJS.enc.Utf8));
      
      
      // Compare password encoded and Login
      if (show.email == this.objectLogin.email) {
        for (let y = 0; y < showPass.length; y++) {
          if (showPass[y] == this.objectLogin.pass) {
            this.LoginLogout.getOneUser(show.id).subscribe(OneUser => {
              this.takeOneUser = OneUser;
              this.takeOneUser.status = true;
              this.objectStatusUser = this.takeOneUser.status;
              this.LoginLogout.updateUser(this.takeOneUser).subscribe();
              window.location.href = `matches/${show.id}`;
            });
          };
        };
      } else {
        this.ErrorLogin = "Error login, Please re-enter !";
        setTimeout(() => {
          location.reload();
        }, 2000);
      };
    });
  };
  onLogout() {
    const consider = window.confirm("Are you sure ?");
    if (consider) {
      this.takeOneUser.status = false;
      this.LoginLogout.updateUser(this.takeOneUser).subscribe();
      window.location.href = "";
      // location.reload();
    }else{
      window.location.href = `/matches/${this.takeOneUser?.id}`;
    };
  };
  // ============================================main form register
  // object values Register
  objectsRegister = {
    name: "",
    email: "",
    dateOfbirth: "",
    city: "",
    country: "",
    pass: "",
    encodePass: 0,
    confirmpass: "",
    gender: "",
    // ========empty default
    age: 0,
    image: "https://picsum.photos/300",
    memberSice: "",
    lastActive: "",
    status: true,
    message: "",
    describes: "",
    arrayImage: [],
    switchLove: [],
    arrayFriend: [],
    arrayBeLike: [],
    role: "",
  }
  ErrorRegister: ILogin = {
    name: "",
    email: "",
    emailcheck: "",
    pass: "",
    confirmpass: "",
    dateOfbirth: "",
    country: "",
    city: "",
    gender: "",
  }
  // compare and register account.
  Register() {
    // console.log(this.objectsRegister);
    let keyOnceToRegister = 0;
    let checkSame_email_name = 0;
    // Filter whitespace and Set conditions.
    const showsubEmail = "@gmail.com";
    this.objectsRegister.name.trim();
    this.objectsRegister.email.trim();
    this.objectsRegister.city.trim();
    this.objectsRegister.country.trim();
    this.objectsRegister.pass.trim();
    this.objectsRegister.confirmpass.trim();
    //================= set Error register and show on display.
    this.objectsRegister.name != "" ? this.ErrorRegister.name = "true" : this.ErrorRegister.name = "false";
    this.objectsRegister.email != "" ? this.ErrorRegister.email = "true" : this.ErrorRegister.email = "false";
    if (this.objectsRegister.email.includes(showsubEmail)) {
      this.ErrorRegister.emailcheck = "true";
    } else {
      this.ErrorRegister.emailcheck = "false";
    }
    this.objectsRegister.pass != "" ? this.ErrorRegister.pass = "true" : this.ErrorRegister.pass = "false";
    this.objectsRegister.confirmpass != "" ? this.ErrorRegister.confirmpass = "true" : this.ErrorRegister.confirmpass = "false";
    this.objectsRegister.dateOfbirth != "" ? this.ErrorRegister.dateOfbirth = "true" : this.ErrorRegister.dateOfbirth = "false";
    this.objectsRegister.country != "" ? this.ErrorRegister.country = "true" : this.ErrorRegister.country = "false";
    this.objectsRegister.city != "" ? this.ErrorRegister.city = "true" : this.ErrorRegister.city = "false";
    this.objectsRegister.gender != "" ? this.ErrorRegister.gender = "true" : this.ErrorRegister.gender = "false";
    //================= set Error register and show on display
    if (
      this.objectsRegister.name != "" &&
      this.objectsRegister.email != "" &&
      this.objectsRegister.dateOfbirth != "" &&
      this.objectsRegister.city != "" &&
      this.objectsRegister.country != "" &&
      this.objectsRegister.pass != "" &&
      this.objectsRegister.confirmpass != "" &&
      this.objectsRegister.gender != ""
    ) {
      if (this.objectsRegister.pass == this.objectsRegister.confirmpass) {
        this.arrayAllUser.map((takeData) => {
          // check same - email - name in database.
          if (takeData.name != this.objectsRegister.name || takeData.email != this.objectsRegister.email) {
            keyOnceToRegister = 1;
          } else {
            checkSame_email_name = 1;
          };
        });
      } else {
        alert("Password not match ?");
      };
    };
    if (checkSame_email_name == 1) {
      alert("It can't to same name or email !");
    };
    // set to AddUser with only click-Add.
    if (keyOnceToRegister == 1) {
      this.objectsRegister.encodePass = 12345678;
      this.objectsRegister.pass = CryptoJS.AES.encrypt(this.objectsRegister.pass, "okdi").toString();
      // setAge-recently
      const nowDay = new Date();
      let nowYear = nowDay.getFullYear();
      let getYourAge = Number(this.objectsRegister.dateOfbirth.slice(0, 4));
      this.objectsRegister.age = nowYear - getYourAge;
      // action: Add Account
      this.LoginLogout.addUser(this.objectsRegister).subscribe();
      // set repositories your messages.
      let object: any = {};
      this.arrayAllUser.map((dataObject: any) => {
        object = dataObject;
      });
      let object2: any = {
        idMain: object.id + 1,
        nameMain: this.objectsRegister.name,
        imageMain: this.objectsRegister.image,
        buddy: [],
      }
      this.LoginLogout.addMessage(object2).subscribe();
      location.reload();
      window.location.href = `matches/${object2.idMain}`;
    };
  };
  Cancel() {
    location.reload();
  };
};
// a = "2004-06-11"
// year = a[:4]  # Lấy 4 ký tự đầu tiên của chuỗi
// print(year)  # Kết quả: 2004

// const encryptedText = CryptoJS.AES.encrypt('Hello, World!', 'vole').toString();
// const decryptedText = CryptoJS.AES.decrypt(encryptedText, 'vole').toString(CryptoJS.enc.Utf8);