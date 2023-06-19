import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Services/services.service';
import { IFilter, ILogin } from 'src/app/typeUser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  KeyOwner: any = 0;//Key Owner account
  ObjectOwner: any = {};
  AllUser: ILogin[] = [];//All Users
  ArrayFilter: ILogin[] = [];//All Users
  // ObjectUserFriend: any = {};// User Belike

  objectFilter: IFilter = {
    numberSmall: 17,
    numberLager: 70,
    gender: "All",
  };

  constructor(
    private controlUser: ServiceService,
    private router: ActivatedRoute
  ) {
    this.controlUser.getAllUser().subscribe((takeAll) => {
      this.AllUser = takeAll.filter((idMatch) => idMatch.id != this.KeyOwner);
      this.ArrayFilter = this.AllUser;
    });
    this.router.paramMap.subscribe((owner) => {
      this.KeyOwner = Number(owner.get("id"));
      this.controlUser.getOneUser(this.KeyOwner).subscribe((data: any) => {
        this.ObjectOwner = data;
      });
    });
  };
  // show filter find
  onFilter() {
    console.log(this.objectFilter);

    this.AllUser.map((data: any) => {
      if (data.gender == this.objectFilter.gender) {
        this.ArrayFilter = this.AllUser.filter((item: any) => item.gender == this.objectFilter.gender && item.age >= this.objectFilter.numberSmall && item.age <= this.objectFilter.numberLager);
      };
      if (this.objectFilter.gender == "All") {
        this.ArrayFilter = this.AllUser.filter((item:any)=>item.age >= this.objectFilter.numberSmall && item.age <= this.objectFilter.numberLager);
      };
    });
  };
  // set switch like and unlike
  Notification = 0;
  SwitchLove: any = [];//array account liked
  DataOneUser: any = {}//owner account on web
  // object belike
  objectBeLike = {
    statusLike: false,
    idLiker: 0,
    id: 0
  }
  like(idUser: any) {
    this.controlUser.getOneUser(this.KeyOwner).subscribe((dataOneUser: any) => {
      this.DataOneUser = dataOneUser;
      this.SwitchLove = this.DataOneUser.switchLove;
      this.DataOneUser.switchLove.push(idUser);
      this.controlUser.updateUser(this.DataOneUser).subscribe();
      this.Notification = idUser;
      console.log(this.DataOneUser);
      console.log(this.SwitchLove);
    });
    this.controlUser.getOneUser(idUser).subscribe((dataUserBeLike: any) => {
      dataUserBeLike.arrayBeLike.push(this.KeyOwner);
      console.log(dataUserBeLike);
      this.controlUser.updateUser(dataUserBeLike).subscribe();
    })
  }
  unlike(idUser: any) {
    this.controlUser.getOneUser(this.KeyOwner).subscribe((dataOneUser: any) => {
      this.DataOneUser = dataOneUser;
      this.DataOneUser.switchLove = this.DataOneUser.switchLove.filter((item: number) => item != idUser)
      this.controlUser.updateUser(this.DataOneUser).subscribe();
      this.SwitchLove = this.DataOneUser.switchLove;
      this.Notification = idUser;
      console.log(this.DataOneUser);
      console.log(this.SwitchLove);
    });
    this.controlUser.getOneUser(idUser).subscribe((dataUserBeLike: any) => {
      dataUserBeLike.arrayBeLike = dataUserBeLike.arrayBeLike.filter((item: any) => item != this.KeyOwner);
      console.log(dataUserBeLike);
      this.controlUser.updateUser(dataUserBeLike).subscribe();
    })
  }
  // object add friends
  statustFriends = {
    status: 0,// status: 1-sender <=> 2-receiver <=> 3-ok friend
    nameAccept: "",
    imageAccept: "",
    idAccept: 0,

    nameSend: "",
    imageSend: "",
    idSend: 0,
  }
  AddFriend(idFriend: any) {
    this.controlUser.getOneUser(idFriend).subscribe((dataOne: any) => {
      // info user Accept
      this.statustFriends.status = 1;
      this.statustFriends.nameAccept = dataOne.name;
      this.statustFriends.imageAccept = dataOne.image;
      this.statustFriends.idAccept = dataOne.id;

      this.statustFriends.nameSend = this.ObjectOwner.name;
      this.statustFriends.imageSend = this.ObjectOwner.image;
      this.statustFriends.idSend = this.ObjectOwner.id;
      // update status receiver and sender
      dataOne.arrayFriend.push(this.statustFriends);
      this.controlUser.updateUser(dataOne).subscribe();
      this.statustFriends.status = 2;
      this.ObjectOwner.arrayFriend.push(this.statustFriends);
      this.controlUser.updateUser(this.ObjectOwner).subscribe();
      location.reload();
    });
  };

  CancelRequest(idFriend: any) {
    console.log(idFriend);

    // this.controlUser.getOneUser(idFriend).subscribe((dataOne: any) => {

    //   dataOne.arrayFriend.push(this.statustFriends);
    //   this.controlUser.updateUser(dataOne).subscribe();
    //   this.ObjectOwner.arrayFriend.push(this.statustFriends);
    //   this.controlUser.updateUser(this.ObjectOwner).subscribe();
    //   location.reload();
    // });

  }
  UnFriend(idFriend: any) {
    console.log(idFriend);

  }
};
