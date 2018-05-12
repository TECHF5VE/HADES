import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/userinfo.service';
import { UserInfoPojo } from '../../entities/block-pojo';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  userInfos: UserInfoPojo[] = [];

  constructor(private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    const that = this;
    this.userInfoService.queryAllUsersInfo().subscribe(res => {
      console.log(res);
      if (res && res['success'] && res['data']) {
        that.userInfos = res['data'] as UserInfoPojo[];
      }
    });
  }

}
