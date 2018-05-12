import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IndexComponent } from './component/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FooterComponent } from './share/footer/footer.component';
import { HeaderComponent } from './share/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { IndexContainerComponent } from './component/index-container/index-container.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatStepperModule
} from '@angular/material';
import { AdminContainerComponent } from './component/admin-container/admin-container.component';
import { AdminComponent } from './component/admin/admin.component';
import { PoolComponent } from './component/pool/pool.component';
import { BlockChainService } from './services/block-chain.service';
import { DebitService } from './services/debit.service';
import { TransacationService } from './services/transacation.service';
import { UserInfoService } from './services/userinfo.service';
import { SideBarComponent } from './share/side-bar/side-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BorrowComponent } from './component/borrow/borrow.component';
import { ChainComponent } from './component/chain/chain.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    IndexContainerComponent,
    AdminContainerComponent,
    AdminComponent,
    PoolComponent,
    SideBarComponent,
    BorrowComponent,
    ChainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    LayoutModule,
    MatIconModule,
    NgxEchartsModule,
  ],
  providers: [
    BlockChainService,
    DebitService,
    TransacationService,
    UserInfoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
