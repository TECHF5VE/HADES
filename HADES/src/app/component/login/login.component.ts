import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  warnMsg = '';
  errorMsg = '';

  isLoading = false;

  constructor(private router: Router,
              private userInfo: UserInfoService) {
  }

  ngOnInit() {
  }

  baseLogin() {
    if (this.username === '') {
      this.alertWarn('用户名不能为空！');
      return;
    }
    if (this.password === '') {
      this.alertWarn('密码不能为空！');
      return;
    }
    this.isLoading = true;
    const pwd = this.password;
    const that = this;
    this.userInfo.login(this.username)
      .subscribe(res => {
        try {
          console.log(res);
          if (res && res['success'] && res['data']) {
            // && JSON.parse(res['payloads'][0])['password'] === pwd) {
            // sessionStorage.setItem('user', res['payloads'][0]);
            sessionStorage.setItem('user', JSON.stringify(res['data']));
            setTimeout(() => that.isLoading = false, 1000);
            that.router.navigate(['/admin'], { replaceUrl: true });
          } else {
            console.warn(res);
            setTimeout(() => that.isLoading = false, 1000);
          }
        } catch (e) {
          console.warn(e);
          setTimeout(() => that.isLoading = false, 1000);
        }
      });
  }

  faceLogin() {
    // TODO 人脸登录
  }

  alertWarn(msg: string) {
    this.warnMsg = msg;
    setTimeout(() => this.warnMsg = '', 2000);
  }

  alertError(msg: string) {
    this.errorMsg = msg;
    setTimeout(() => this.errorMsg = '', 2000);
  }

}
