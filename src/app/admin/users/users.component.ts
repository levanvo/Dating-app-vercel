import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  DataUsers: any[] = [];
  ObjectUsers: any = {
    name: "",
    email: "",
    pass: "",
    repass: "",
  }
  constructor(
    private controlUsers: ServiceService,

  ) {
    this.controlUsers.AllAuthor().subscribe((dataUsers: any) => {
      dataUsers.data.map((dataGet: any) => {
        if (dataGet.role != "admin") {
          this.DataUsers.push(dataGet);
        };
        console.log(dataGet.role);

      });
    });
  };


  OnAddUsers() {
    console.log(this.ObjectUsers);

    if (Object.keys(this.ObjectUsers).some(key1 => this.ObjectUsers[key1] == "")) {
      alert("Form empty ?");
    } else {
      if (this.ObjectUsers.pass.length > 3) {
        if (this.ObjectUsers.pass == this.ObjectUsers.repass) {
          this.controlUsers.Signup(this.ObjectUsers).subscribe();
          alert((((("Added user")))));
          location.reload();
        } else {
          alert("Password not match !");
        };
      } else {
        alert("the length of pass >=3");
      };
    };
  };

  RemoveUser(idR: any) {
    console.log(idR);
    const see = window.confirm("Remove this user ?");
    if (see) {
      this.controlUsers.RemoveAuthor(idR).subscribe();
      location.reload();
      alert("Remove successfully !");
    };
  };
};
