/*
 * File: /src/app/services/debit.service.ts
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
import { BlockChainService } from './block-chain.service';
import { DebitInfoPojo, BlockType } from '../entities/block-pojo';

@Injectable()
export class DebitService {
    constructor(
        public httpService: Http,
        public blockChainService: BlockChainService,
    ) { }

    private _debitBlockChain: DebitInfoPojo[] = [];


    public get debitBlockChain(): DebitInfoPojo[] {
        return this._debitBlockChain;
    }

    async sync() {
        await this.blockChainService.sync();

        this._debitBlockChain = [];
        this.blockChainService.blockChain.forEach(block => {
            if (block.type === BlockType.Debit) {
                this._debitBlockChain.push(block.debitInfo);
            }
        });
    }
}
