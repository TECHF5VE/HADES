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
import { BlockChainService } from '../services/block-chain.service';
import { BlockPojo, UserInfoPojo, BlockType } from '../entities/block-pojo';

@Injectable()
export class UserInfoService {
    constructor(
        public httpService: Http,
        public blockChainService: BlockChainService,
    ) { }

    private _userInfoBlockChain: UserInfoPojo[] = [];

    public get userInfoBlockChain(): UserInfoPojo[] {
        return this._userInfoBlockChain;
    }

    async sync() {
        await this.blockChainService.sync();

        this._userInfoBlockChain = [];

        this.blockChainService.blockChain.forEach(block => {
            if (block.type === BlockType.User) {
                this.userInfoBlockChain.push(block.userInfo);
            }
        });
    }

    async addUserInfo(userInfo: UserInfoPojo) {
        //
    }

    async login(password: string) {
        //
    }
}
