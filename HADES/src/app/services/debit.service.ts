/*
 * File: /src/app/services/debit.service.ts
 * Created Date: Saturday May 12th 2018
 * Author: huisama
 * -----
 * Last Modified: Sun May 13 2018
 * Modified By: huisama
 * -----
 * Copyright (c) 2018 Hui
 */

import { Injectable } from '@angular/core';
import { BlockChainService } from './block-chain.service';
import { DebitInfoPojo, BlockType } from '../entities/block-pojo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as API from '../share/api';
import { Observable, of } from 'rxjs/index';
import { catchError, tap } from 'rxjs/internal/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DebitService {
  constructor(
    public http: HttpClient,
    public blockChainService: BlockChainService,
  ) {
  }

  private _debitBlockChain: DebitInfoPojo[] = [];

  public get debitBlockChain(): DebitInfoPojo[] {
    return this._debitBlockChain;
  }

  /*async sync() {
      await this.blockChainService.sync();

      this._debitBlockChain = [];
      this.blockChainService.blockChain.forEach(block => {
          if (block.type === BlockType.Debit) {
              this._debitBlockChain.push(block.debitInfo);
          }
      });
  }*/

  fetchDebit(): Observable<DebitInfoPojo[]> {
    const that = this;
    return this.http.post(API.Query, {
      func: 'queryDebit',
      parameters: [that.getUsername()]
    }, httpOptions).pipe(
      tap((res: DebitInfoPojo[]) => this.log(`fetchDebit ${res[0]}`)),
      catchError(this.handleError<DebitInfoPojo[]>('fetchDebit', []))
    );
  }

  raiseDebit(fundRaiserID: string, fundRaiseRest: number, fundOvertimeTime: number, validation: number, repaid: number): Observable<any> {
    const that = this;
    // Todo: calc timestamp
    return this.http.post(API.Query, {
      func: 'raiseDebit',
      parameters: [fundRaiserID, fundRaiseRest, 0, validation, repaid]
    }, httpOptions).pipe(
      tap((res: any) => this.log(`raiseDebit ${res[0]}`)),
      catchError(this.handleError<any>('raiseDebit', []))
    );
  }


  private getUsername(): string {
    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        return JSON.parse(user)['name'];
      }
    } catch (e) {
      console.warn(e);
    }
    return '';
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('UserInfoService: ' + message);
  }
}
