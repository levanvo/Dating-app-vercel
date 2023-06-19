import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  UserMessage: any = {};//người nhận tin
  AccountMessage: any = {};//người gửi tin
  DatabaseMessage:any[]=[];//dữ liệu liên lạc của account
  InforMessage:any={};//đoạn chat của 2 bên

  contentMessage: any = {
    idSendMessager: 0,
    writing: "",
  };

  constructor(
    private idUser: ActivatedRoute,
    private controlUser: ServiceService,
  ) {
    this.idUser.paramMap.subscribe((idParam: any) => {
      const id = Number(idParam.get("id"));
      this.controlUser.getOneUser(id).subscribe((userMessage: any) => {
        this.UserMessage = userMessage;
      });
    });
    this.controlUser.getAllUser().subscribe((data: any) => {
      data.map((xem: any) => {
        if (xem.status == true) {
          this.AccountMessage = xem;
          this.controlUser.getOneMessage(this.AccountMessage.id).subscribe((dataMessage:any)=>{
            // console.log(dataMessage);
            this.DatabaseMessage=dataMessage;
            dataMessage?.buddy?.map((getData:any)=>{
              if(getData.idConnect==this.UserMessage.id){
                this.InforMessage=getData;
                console.log(getData.content);
                console.log(getData);
              };
            });
          });
        };
      });
    });
  };



  objectMessage1: any = {
    idConnect: 1,
    imageConnect: "",
    nameConnect: "",
    content: []
  };
  objectMessage2: any = {
    idConnect: 1,
    imageConnect: "",
    nameConnect: "",
    content: []
  };
  checkingBuddy1 = false;
  checkingBuddy2 = false;
  SendMessage(idReceiver1: any) {//id người nhận
    this.controlUser.getAllMessage().subscribe((Allmessage: any) => {
      Allmessage?.map((xem: any) => {
        // bên người gửi
        if (xem.idMain == this.AccountMessage.id) {
          if(xem.buddy.length<=0){
            this.objectMessage1.idConnect = this.UserMessage.id;
            this.objectMessage1.imageConnect = this.UserMessage.image;
            this.objectMessage1.nameConnect = this.UserMessage.name;
            this.contentMessage.idSendMessager = this.AccountMessage.id;
            this.objectMessage1.content.push(this.contentMessage);
            xem.buddy.push(this.objectMessage1);
            this.controlUser.updateMessage(xem).subscribe();
          };
          xem.buddy?.map((showMap: any) => {
            if (showMap.idConnect == this.UserMessage.id) {
              this.contentMessage.idSendMessager = this.AccountMessage.id;
              showMap.content.push(this.contentMessage);
              this.controlUser.updateMessage(xem).subscribe();
            } else {
              this.checkingBuddy1 = true;
            }
          });
          if (this.checkingBuddy1 == true) {
            this.objectMessage1.idConnect = this.UserMessage.id;
            this.objectMessage1.imageConnect = this.UserMessage.image;
            this.objectMessage1.nameConnect = this.UserMessage.name;
            this.contentMessage.idSendMessager = this.AccountMessage.id;
            this.objectMessage1.content.push(this.contentMessage);
            xem.buddy.push(this.objectMessage1);
            this.controlUser.updateMessage(xem).subscribe();
          };
        };
        // bên người nhận
        if (xem.idMain == this.UserMessage.id) {
          if(xem.buddy.length<=0){
            this.objectMessage2.idConnect = this.AccountMessage.id;
            this.objectMessage2.imageConnect = this.AccountMessage.image;
            this.objectMessage2.nameConnect = this.AccountMessage.name;
            this.contentMessage.idSendMessager = this.UserMessage.id;
            this.objectMessage2.content.push(this.contentMessage);
            xem.buddy.push(this.objectMessage2);
            this.controlUser.updateMessage(xem).subscribe();
          };
          xem.buddy?.map((showMap: any) => {
            if (showMap.idConnect == this.AccountMessage.id) {
              this.contentMessage.idSendMessager = this.AccountMessage.id;
              showMap.content.push(this.contentMessage);
              this.controlUser.updateMessage(xem).subscribe();
            } else {
              this.checkingBuddy2 = true;
            }
          });
          if (this.checkingBuddy2 == true) {
            this.objectMessage2.idConnect = this.AccountMessage.id;
            this.objectMessage2.imageConnect = this.AccountMessage.image;
            this.objectMessage2.nameConnect = this.AccountMessage.name;
            this.contentMessage.idSendMessager = this.UserMessage.id;
            this.objectMessage2.content.push(this.contentMessage);
            xem.buddy.push(this.objectMessage2);
            this.controlUser.updateMessage(xem).subscribe();
          };
        };
        location.reload();
      });
    });
  };
};