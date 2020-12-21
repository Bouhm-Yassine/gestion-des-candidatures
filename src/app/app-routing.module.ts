import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CandidatureComponent } from './Components/candidature/candidature.component';
import { ProfileStagiereComponent } from './Components/profile-stagiere/profile-stagiere.component';
import { ProfileAdminComponent } from './Components/profile-admin/profile-admin.component';
import { StagieresComponent } from './Components/stagieres/stagieres.component';
import { SingleStagiereComponent } from './Components/single-stagiere/single-stagiere.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { CompleterProfileStagiereComponent } from './Components/completer-profile-stagiere/completer-profile-stagiere.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'candidature' , component: CandidatureComponent},
  {path: 'sign-in' , component: SignInComponent},
  {path: 'sign-in/profileStagiere/:idStagiere' ,component: ProfileStagiereComponent},
  {path: 'sign-in/profileStagiere/:idStagiere/CompleterProfileStagiere' ,component: CompleterProfileStagiereComponent},
  {path: 'sign-in/profileAdmin/:idAdmin' , component: ProfileAdminComponent},
  {path: 'sign-in/profileAdmin/:idAdmin/employee'  ,component: EmployeeComponent},
  {path: 'sign-in/profileAdmin/:idAdmin/listStagiere' ,component: StagieresComponent},
  {path: 'sign-in/profileAdmin/:idAdmin/listStagiere/singleStagiere/:id' ,component: SingleStagiereComponent},
  {path: 'not-found' , component: NotFoundComponent},
  {path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
