import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/services.service';
import { ILogin } from 'src/app/typeUser';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  Account = {} as ILogin;//Account main
  KeyAccount: any = 0;
  Friends = [] as any;// get quantity,info friends
  DetailFriends = [] as any;// get details of friends
  constructor(
    private router: ActivatedRoute,
    private controlUser: ServiceService,
  ) {
    this.router.paramMap.subscribe(key => this.KeyAccount = Number(key.get("id")));
    this.controlUser.getOneUser(this.KeyAccount).subscribe((data: any) => {
      this.Account = data;

      data.arrayFriend.map((items: any) => {
        if (items.status == 3) {
          this.Friends.push(items);
          // When acceptor is others
          if (items.idAccept != data.id) {
            this.controlUser.getOneUser(items.idAccept).subscribe((dataF1: any) => {
              this.DetailFriends.push(dataF1);
            });
          };
          // When acceptor is you
          if (items.idSend != data.id) {
            this.controlUser.getOneUser(items.idSend).subscribe((dataF1: any) => {
              this.DetailFriends.push(dataF1);
              // console.log(this.DetailFriends);//tat ca done.
            });
          };
        };
      });
    });

  };
  Message(idMessage: any) {
    // console.log(idMessage);
    window.location.href=`/matches/${this.Account.id}/message/${idMessage}`;
  };
  UnFriend(idUnFriend: any) {
    // console.log(idUnFriend);
    const conside = window.confirm("Can you confirm unFiending ?");
    if (conside) {
      // Account unFriend
      this.Account?.arrayFriend?.map((items: any) => {
        if (items.status == 3) {
          if (items.idSend == idUnFriend) {
            this.Account.arrayFriend = this.Account.arrayFriend.filter((item: any) => item.idSend != idUnFriend);
            this.controlUser.updateUser(this.Account).subscribe();
          };

          if (items.idAccept == idUnFriend) {
            this.Account.arrayFriend = this.Account.arrayFriend.filter((item: any) => item.idAccept != idUnFriend);
            this.controlUser.updateUser(this.Account).subscribe();
          };
        };
      });


      // UnFriended person
      this.controlUser.getOneUser(idUnFriend).subscribe((dataUnfriend: any) => {
        dataUnfriend?.arrayFriend?.map((items: any) => {
          if (items.status == 3) {
            if (items.idSend == this.Account.id) {
              dataUnfriend.arrayFriend = dataUnfriend.arrayFriend.filter((item: any) => item.idSend != this.Account.id);
              this.controlUser.updateUser(dataUnfriend).subscribe();
            };

            if (items.idAccept == this.Account.id) {
              dataUnfriend.arrayFriend = dataUnfriend.arrayFriend.filter((item: any) => item.idAccept != this.Account.id);
              this.controlUser.updateUser(dataUnfriend).subscribe();
            };
          };
        });
      });
      // Waiting a little
      setTimeout(() => {
        location.reload();
      }, 1500);
    };
  };
};