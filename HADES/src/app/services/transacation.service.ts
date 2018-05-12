/*
 * File: /src/app/services/transacation.service.ts
 * Created Date: Saturday May 12th 2018
 * Author: huisama
 * -----
 * Last Modified: Sat May 12 2018
 * Modified By: huisama
 * -----
 * Copyright (c) 2018 Hui
 */

import { Injectable } from '@angular/core';
import { BlockChainService } from './block-chain.service';
import { TransacationPojo, BlockType } from '../entities/block-pojo';
import { HttpClient } from "@angular/common/http";
import * as API from '../share/api';
import { Observable } from "rxjs/index";

@Injectable()
export class TransacationService {
  constructor(
    public http: HttpClient,
    public blockChainService: BlockChainService,
  ) {
  }

  private _transacationChain: TransacationPojo[] = [];

  public get debitBlockChain(): TransacationPojo[] {
    return this._transacationChain;
  }

  /*async sync() {
      await this.blockChainService.sync();

      this._transacationChain = [];
      this.blockChainService.blockChain.forEach(block => {
          if (block.type === BlockType.Transacation) {
              this._transacationChain.push(block.transacationInfo);
          }
      });
  }*/

  fetchTransacation(): Observable<TransacationPojo[]> {
    // TODO
  }
}
