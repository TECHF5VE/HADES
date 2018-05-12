import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./component/index/index.component";
import { LoginComponent } from "./component/login/login.component";
import { RegisterComponent } from "./component/register/register.component";
import { IndexContainerComponent } from "./component/index-container/index-container.component";

const indexRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

const appRoutes: Routes = [
  { path: '', component: IndexContainerComponent, children: indexRoutes },
  { path: '**', redirectTo: 'index', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
