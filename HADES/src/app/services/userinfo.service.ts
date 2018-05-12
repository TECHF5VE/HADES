/*
 * File: /src/services/userinfo.service.ts
 * Created Date: Saturday May 12th 2018
 * Author: huisama
 * -----
 * Last Modified: Sat May 12 2018
 * Modified By: huisama
 * -----
 * Copyright (c) 2018 Hui
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserInfoPojo } from '../entities/user-info';


@Injectable()
export class UserInfoService {

    userInfos: UserInfoPojo[] = [];

    constructor(
        public httpService: Http
    ) {}

    async syncData() {
        // this.httpService.get()
    }

    async addUserInfo(userInfo: UserInfoPojo) {
        //
    }

    async login(password: string) {
        //
    }
}
