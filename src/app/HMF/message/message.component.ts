import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/services.service';
import axios from "axios";
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
    time:""
  };
  imageMessage: any = {
    idSendMessager: 0,
    imageSend: "",
    time:""
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
    let time=new Date();
    let time1=time.getDate();
    let time2=time.getMonth();
    let time3=time.getFullYear();
    let time4=time.getHours();
    let time5=time.getMinutes();
    let time6=time.getSeconds();
    const timeVanVo=("Date of Time: "+time1 + "/"+(time2+1)+"/"+time3);
    const timeVoVan=(time4 + ":"+(time5)+":"+time6);
    const timeLeVanVo=timeVanVo + " ________ " +timeVoVan;
    console.log(timeLeVanVo);
    this.contentMessage.time=timeLeVanVo;
    this.imageMessage.time=timeLeVanVo;
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

  async OnchangeImage(event:any){
    const ImageFile=event.target.files[0];
    const cloudName = "darnprw0q";
    const PresetName = "vole_2k";
    const FolderName = "test";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const upImage = new FormData();

    upImage.append("upload_preset", PresetName);
    upImage.append("folder", FolderName);

      upImage.append("file", ImageFile);
      const get_image = await axios.post(api, upImage, {
        headers: {
          "Content-Type": "multiple/form-data",
        },
      });
      // console.log(get_image.data.secure_url);
    this.imageMessage.imageSend=get_image.data.secure_url;
    // bắt đầu xử lí ảnh cho 2 phía
    this.controlUser.getAllMessage().subscribe((Allmessage: any) => {
      Allmessage?.map((xem: any) => {
        // bên người gửi
        if (xem.idMain == this.AccountMessage.id) {
          if(xem.buddy.length<=0){
            this.objectMessage1.idConnect = this.UserMessage.id;
            this.objectMessage1.imageConnect = this.UserMessage.image;
            this.objectMessage1.nameConnect = this.UserMessage.name;
            this.imageMessage.idSendMessager = this.AccountMessage.id;
            this.objectMessage1.content.push(this.imageMessage);
            xem.buddy.push(this.objectMessage1);
            this.controlUser.updateMessage(xem).subscribe();
          };
          xem.buddy?.map((showMap: any) => {
            if (showMap.idConnect == this.UserMessage.id) {
              this.imageMessage.idSendMessager = this.AccountMessage.id;
              showMap.content.push(this.imageMessage);
              this.controlUser.updateMessage(xem).subscribe();
            } else {
              this.checkingBuddy1 = true;
            }
          });
          if (this.checkingBuddy1 == true) {
            this.objectMessage1.idConnect = this.UserMessage.id;
            this.objectMessage1.imageConnect = this.UserMessage.image;
            this.objectMessage1.nameConnect = this.UserMessage.name;
            this.imageMessage.idSendMessager = this.AccountMessage.id;
            this.objectMessage1.content.push(this.imageMessage);
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
            this.imageMessage.idSendMessager = this.UserMessage.id;
            this.objectMessage2.content.push(this.imageMessage);
            xem.buddy.push(this.objectMessage2);
            this.controlUser.updateMessage(xem).subscribe();
          };
          xem.buddy?.map((showMap: any) => {
            if (showMap.idConnect == this.AccountMessage.id) {
              this.imageMessage.idSendMessager = this.AccountMessage.id;
              showMap.content.push(this.imageMessage);
              this.controlUser.updateMessage(xem).subscribe();
            } else {
              this.checkingBuddy2 = true;
            }
          });
          if (this.checkingBuddy2 == true) {
            this.objectMessage2.idConnect = this.AccountMessage.id;
            this.objectMessage2.imageConnect = this.AccountMessage.image;
            this.objectMessage2.nameConnect = this.AccountMessage.name;
            this.imageMessage.idSendMessager = this.UserMessage.id;
            this.objectMessage2.content.push(this.imageMessage);
            xem.buddy.push(this.objectMessage2);
            this.controlUser.updateMessage(xem).subscribe();
          };
        };
        location.reload();
      });
    });
    // console.log(this.imageMessage.imageSend);
    
  }
  
  checkingBuddy1 = false;
  checkingBuddy2 = false;
  
  SendMessage(idReceiver1: any) {//id người nhận
    if(this.contentMessage.writing){
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
};