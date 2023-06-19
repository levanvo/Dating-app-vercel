import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './HMF/footer/footer.component';
import { MatchesComponent } from './HMF/matches/matches.component';
import { ListComponent } from './HMF/list/list.component';
import { ErrorComponent } from './HMF/error/error.component';
import { MessageComponent } from './HMF/message/message.component';
import { ManagerComponent } from './HMF/manager/manager.component';
import { FriendsComponent } from './HMF/list/friends/friends.component';
import { WaitingFriendComponent } from './HMF/list/waiting-friend/waiting-friend.component';
import { LikedComponent } from './HMF/list/liked/liked.component';
import { InformationComponent } from './HMF/manager/information/information.component';
import { YourImagesComponent } from './HMF/manager/your-images/your-images.component';

const routes: Routes = [
  {path:"matches/:id",component:MatchesComponent},
  {path:"list/:id",redirectTo:"list/:id/friends/:id",pathMatch:"full"},
  {path:"list/:id",component:ListComponent,children:[
    {path:"friends/:id",component:FriendsComponent},
    {path:"waitingFriend/:id",component:WaitingFriendComponent},
    {path:"liked/:id",component:LikedComponent},
    {path:"",component:FriendsComponent},
  ]},
  {path:"message/:id",component:MessageComponent},
  {path:"matches/:id/message/:id",component:MessageComponent},
  {path:"error/:id",component:ErrorComponent},
  {path:"manager/:id",redirectTo:"manager/:id/information/:id",pathMatch:"full"},
  {path:"manager/:id",component:ManagerComponent,children:[
    {path:"information/:id",component:InformationComponent},
    {path:"yourImages/:id",component:YourImagesComponent},
  ]},
  {path:"**",component:MatchesComponent,pathMatch:"full"},
  {path:"",redirectTo:"matches/:id",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
