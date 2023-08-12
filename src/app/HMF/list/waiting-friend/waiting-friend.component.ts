import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-waiting-friend',
  templateUrl: './waiting-friend.component.html',
  styleUrls: ['./waiting-friend.component.scss']
})
export class WaitingFriendComponent {
  ObjectOwner: any = {};//Owner account
  InfoUserSending: any[] = [];//All sending friend
  InfoUserReceived: any[] = [];//Received

  constructor(
    private router: ActivatedRoute,
    private controlUser: ServiceService,
  ) {
    this.router.paramMap.subscribe((key: any) => {
      this.controlUser.getOneUser(Number(key.get("id"))).subscribe((data: any) => {
        this.ObjectOwner = data;
        this.ObjectOwner.arrayFriend.map((xem: any) => {
          if (xem.status == 1) {
            this.InfoUserReceived.push(xem);
          } else if (xem.status == 2) {
            this.InfoUserSending.push(xem);
          };
        });
      });
    });
  };

  UnRequest(idAcceptt: any) {
    // Sender
    this.ObjectOwner.arrayFriend = this.ObjectOwner.arrayFriend.filter((item: any) => item.idAccept != idAcceptt);
    this.controlUser.updateUser(this.ObjectOwner).subscribe();
    // Receiver
    this.controlUser.getOneUser(idAcceptt).subscribe((dataUserAccept: any) => {
      dataUserAccept.arrayFriend = dataUserAccept.arrayFriend.filter((item: any) => item.idSend != this.ObjectOwner.id);
      this.controlUser.updateUser(dataUserAccept).subscribe();
      location.reload();
    });

  };
  Disagree(idSend: any) {
    console.log(idSend);

    // Receiver
    this.ObjectOwner.arrayFriend = this.ObjectOwner.arrayFriend.filter((item: any) => item.idSend != idSend);
    this.controlUser.updateUser(this.ObjectOwner).subscribe();
    // Sender
    this.controlUser.getOneUser(idSend).subscribe((dataUserAccept: any) => {
      dataUserAccept.arrayFriend = dataUserAccept.arrayFriend.filter((item: any) => item.idAccept != this.ObjectOwner.id);
      this.controlUser.updateUser(dataUserAccept).subscribe();
      location.reload();
    });
  }
  Agree(idSend: any) {
    // Agree from receiver
    let look = false;
    this.ObjectOwner.arrayFriend.map((itemFriends: any) => {
      if (idSend == itemFriends.idSend) {
        itemFriends.status = 3;
        this.controlUser.updateUser(this.ObjectOwner).subscribe();
        look = true;
      };
    });
    // Response from sender
    this.controlUser.getOneUser(idSend).subscribe((dataUserAccept: any) => {
      dataUserAccept.arrayFriend.map((itemFriends: any) => {
        if (itemFriends.idAccept == this.ObjectOwner.id) {
          itemFriends.status = 3;
          this.controlUser.updateUser(dataUserAccept).subscribe();
          location.reload();
        };
      });
    });
    console.log(look);
  };




};
