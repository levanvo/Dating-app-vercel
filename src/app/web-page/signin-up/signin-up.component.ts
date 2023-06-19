import { Component } from '@angular/core';
import { ServiceService } from "../../service/service.service"
@Component({
  selector: 'app-signin-up',
  templateUrl: './signin-up.component.html',
  styleUrls: ['./signin-up.component.scss']
})
export class SigninUpComponent {
  DataSign_up: any = {
    name: "",
    email: "",
    pass: "",
    repass: "",
    // status: false,
    // image: "https://picsum.photos/300",
  };
  DataSign_in: any = {
    email: "",
    pass: "",
    repass: "",
  }

  constructor(
    private controlSignup_in: ServiceService
  ) {

  };
  OnSign_up() {
    console.log(this.DataSign_up);
    if (Object.keys(this.DataSign_up).some(key1 => this.DataSign_up[key1] == "")) {
      alert("Form empty ?");
    } else {
      if (this.DataSign_up.pass.length < 3) {
        alert("Password need 3 characters or more !");
      } else {
        if (this.DataSign_up.pass == this.DataSign_up.repass) {
          this.controlSignup_in.Signup(this.DataSign_up).subscribe();
          alert("Sign-up successfully !");
          location.reload();
        } else {
          alert("Password not match !");
        };
      };
    };
  }
  OnSign_in() {
    console.log(this.DataSign_in);
    if (this.DataSign_in.pass == this.DataSign_in.repass) {
      this.controlSignup_in.AllAuthor().subscribe((dataSign: any) => {
        dataSign.data.map((showUsers: any) => {
          if (showUsers.repass == this.DataSign_in.repass && showUsers.email == this.DataSign_in.email) {
            showUsers.status = true;
            this.controlSignup_in.updateAuthor(showUsers).subscribe();
            alert("Welcome: " + showUsers.name);
            window.location.href = "";
          };
        });
      });
    } else {
      alert("Password not match !");
    };
    if (Object.keys(this.DataSign_in).some(key => this.DataSign_in[key] == "")) {
      alert("Form empty ??");
    };
  };
}
