import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './HMF/header/header.component';
import { FooterComponent } from './HMF/footer/footer.component';
import { MatchesComponent } from './HMF/matches/matches.component';
import { ListComponent } from './HMF/list/list.component';
import { MessageComponent } from './HMF/message/message.component';
import { ErrorComponent } from './HMF/error/error.component';
import { ManagerComponent } from './HMF/manager/manager.component';
import { FriendsComponent } from './HMF/list/friends/friends.component';
import { WaitingFriendComponent } from './HMF/list/waiting-friend/waiting-friend.component';
import { LikedComponent } from './HMF/list/liked/liked.component';
import { InformationComponent } from './HMF/manager/information/information.component';
import { YourImagesComponent } from './HMF/manager/your-images/your-images.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MatchesComponent,
    ListComponent,
    MessageComponent,
    ErrorComponent,
    ManagerComponent,
    FriendsComponent,
    WaitingFriendComponent,
    LikedComponent,
    InformationComponent,
    YourImagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
