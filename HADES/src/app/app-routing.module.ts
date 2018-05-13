import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { IndexContainerComponent } from './component/index-container/index-container.component';
import { AdminContainerComponent } from './component/admin-container/admin-container.component';
import { AdminComponent } from './component/admin/admin.component';
import { PoolComponent } from './component/pool/pool.component';
import { BorrowComponent } from './component/borrow/borrow.component';
import { ChainComponent } from './component/chain/chain.component';

const indexRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'index', pathMatch: 'full' }
];

const adminRoutes: Routes = [
  { path: 'index', component: AdminComponent },
  { path: 'pool', component: PoolComponent },
  { path: 'borrow', component: BorrowComponent },
  { path: 'chain', component: ChainComponent },
  { path: '**', redirectTo: 'index', pathMatch: 'full' }
];

const appRoutes: Routes = [
  { path: 'admin', component: AdminContainerComponent, children: adminRoutes },
  { path: '', component: IndexContainerComponent, children: indexRoutes },
  { path: '**', redirectTo: 'index', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
