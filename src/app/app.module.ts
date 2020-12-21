import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileAdminComponent } from './Components/profile-admin/profile-admin.component';
import { ProfileStagiereComponent } from './Components/profile-stagiere/profile-stagiere.component';
import { HomeComponent } from './Components/home/home.component';
import { CandidatureComponent } from './Components/candidature/candidature.component';
import { StagieresComponent } from './Components/stagieres/stagieres.component';
import { SingleStagiereComponent } from './Components/single-stagiere/single-stagiere.component';
import { AuthService } from './Services/auth.service';
import { StagiereService } from './Services/stagiere.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HeaderComponent } from './header/header.component';

import { AngularFireModule } from '@angular/fire';

import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { SignInComponent } from './Components/sign-in/sign-in.component';
import { from } from 'rxjs';
import { StagiereFilterPipe } from './Components/stagieres/stagiere-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeComponent } from './Components/employee/employee.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { AuthGuardAdminService } from './Services/auth-guard-admin.service';
import { AuthGuardStagiereService } from './Services/auth-guard-stagiere.service';
import { CompleterProfileStagiereComponent } from './Components/completer-profile-stagiere/completer-profile-stagiere.component';
import { MonAdminComponent } from './Components/mon-admin/mon-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    ProfileAdminComponent,
    ProfileStagiereComponent,
    HomeComponent,
    CandidatureComponent,
    StagieresComponent,
    SingleStagiereComponent,
    NotFoundComponent,
    HeaderComponent,
    SignInComponent,
    StagiereFilterPipe,
    EmployeeComponent,
    CompleterProfileStagiereComponent,
    MonAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp({
        apiKey: "apiKey",
        authDomain: "appnameId.firebaseapp.com",
        databaseURL: "https://appnameId.firebaseio.com",
        projectId: "appnameId",
        storageBucket: "appnameId.appspot.com",
        messagingSenderId: "Id",
        appId: "AppId"})
  ],
  providers: [AuthService, StagiereService, AuthGuardService, AuthGuardAdminService, 
  AuthGuardStagiereService],
  bootstrap: [AppComponent]
})
export class AppModule { }
