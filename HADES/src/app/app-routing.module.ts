import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./component/index/index.component";

const appRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: '**', redirectTo: 'index', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
