import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebPageComponent } from './web-page/web-page.component';
import { AdminComponent } from './admin/admin.component';
import { BodyComponent } from './web-page/body/body.component';
import { CategoryComponent } from './web-page/category/category.component';
import { BlogComponent } from './web-page/blog/blog.component';
import { ContactComponent } from './web-page/contact/contact.component';
import { CartComponent } from './web-page/cart/cart.component';
import { DetailsPrComponent } from './web-page/details-pr/details-pr.component';
import { SigninUpComponent } from './web-page/signin-up/signin-up.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductsComponent } from './admin/products/products.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { UsersComponent } from './admin/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    WebPageComponent,
    AdminComponent,
    BodyComponent,
    CategoryComponent,
    BlogComponent,
    ContactComponent,
    CartComponent,
    DetailsPrComponent,
    SigninUpComponent,
    AdminUserComponent,
    DashboardComponent,
    ProductsComponent,
    CategoriesComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
