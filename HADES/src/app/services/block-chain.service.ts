/*
 * File: /src/app/services/block-chain.service.ts
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

import { BlockPojo } from '../entities/block-pojo';

@Injectable()
export class BlockChainService {

    constructor(
        public httpService: Http,
    ) {

    }

    private _blockChain: BlockPojo[] = [];

    public get blockChain(): BlockPojo[] {
        return this._blockChain;
    }

    async sync() {
        //
    }
}
