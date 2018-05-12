/*
 * File: /src/app/services/transacation.service.ts
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
import { TransacationPojo, BlockType, DebitInfoPojo } from '../entities/block-pojo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as API from '../share/api';
import { Observable, of } from 'rxjs/index';
import { catchError, tap } from 'rxjs/internal/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
    const that = this;
    return this.http.post(API.Query, {
      func: 'queryTransacation',
      parameters: [that.getUsername()]
    }, httpOptions).pipe(
      tap((res: TransacationPojo[]) => this.log(`fetchDebit ${res[0]}`)),
      catchError(this.handleError<TransacationPojo[]>('fetchDebit', []))
    );
  }

  addTransacation(to: string, amount: number, belongTo: number): Observable<TransacationPojo[]> {
    const that = this;
    return this.http.post(API.Invoke, {
      func: 'addTransacation',
      parameters: [this.getUsername(), to, amount, belongTo]
    }, httpOptions).pipe(
      tap((res: any) => this.log(`addTransacation ${res[0]}`)),
      catchError(this.handleError<any>('addTransacation', []))
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
