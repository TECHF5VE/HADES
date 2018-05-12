import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';
import { UserInfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('stepper') stepper: MatHorizontalStepper;

  isFirstLoading = false;
  isSecondLoading = false;
  firstHelpMsg = '';
  secondHelpMsg = '';

  username = '';
  password = '';

  IDCard: any = null;
  UserPic: any = null;

  constructor(private userService: UserInfoService) {
  }

  ngOnInit() {
  }

  validateFirst() {
    if (this.username === '') {
      this.showFirstHelpMsg('用户名不能为空！');
      return;
    }
    if (this.password === '') {
      this.showFirstHelpMsg('密码不能为空！');
      return;
    }
    if (this.password.length < 6) {
      this.showFirstHelpMsg('密码长度需大于等于6！');
      return;
    }
    // this.isFirstLoading = true;
    this.stepper.next();
  }

  showFirstHelpMsg(msg: string) {
    this.firstHelpMsg = msg;
    setTimeout(() => this.firstHelpMsg = '', 2000);
  }

  getUserID() {
    // todo
  }

  getUserPic() {
    // todo
  }

  validateSecond() {
    // FIXME IDCARD
    // if (!this.IDCard) {
    //   return;
    // }
    // if (!this.UserPic) {
    //   return;
    // }

    const that = this;
    this.isSecondLoading = true;
    this.userService.addUserInfo({
      name: this.username,
      idc: 'fuck123',
      phoneNum: this.username,
      password: this.password,
      address: ''
    }).subscribe(res => {
      try {
        console.log(res);
        if (res && res['success']) {
          setTimeout(() => that.isSecondLoading = false, 1000);
          that.stepper.next();
        } else {
          console.warn(res);
          setTimeout(() => that.isSecondLoading = false, 1000);
        }
      } catch (e) {
        console.warn(e);
        setTimeout(() => that.isSecondLoading = false, 1000);
      }
    });
  }

}
