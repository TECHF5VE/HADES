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
import { BlockChainService } from './block-chain.service';
import { BlockPojo, UserInfoPojo, BlockType } from '../entities/block-pojo';
import * as API from '../share/api';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs/index";
import { catchError, tap } from "rxjs/internal/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserInfoService {
  constructor(
    public http: HttpClient,
    public blockChainService: BlockChainService,
  ) {
  }

  /*private _userInfoBlockChain: UserInfoPojo[] = [];

  public get userInfoBlockChain(): UserInfoPojo[] {
    return this._userInfoBlockChain;
  }

  // 同步Chain到本地
  async sync() {
    await this.blockChainService.sync();

    this._userInfoBlockChain = [];

    this.blockChainService.blockChain.forEach(block => {
      if (block.type === BlockType.User) {
        this.userInfoBlockChain.push(block.userInfo);
      }
    });
  }*/

  addUserInfo(userInfo: UserInfoPojo): Observable<any> {
    return this.http.post(API.Invoke, {
      func: 'addUser',
      // params: [userInfo.name, userInfo.idc, userInfo.phoneNum, userInfo.password],
      parameters: [userInfo.name, userInfo.idc, userInfo.phoneNum, "address", userInfo.password],
      account: API.Account
    }, httpOptions).pipe(
      tap((res) => this.log(`add UserInfo`)),
      catchError(this.handleError<object>('add UserInfo'))
    );
  }

  login(username: string): Observable<UserInfoPojo[]> {
    return this.http.post(API.Query, {
      func: 'queryUser',
      // params: [username]
      parameters: [username]
    }, httpOptions).pipe(
      tap((res: UserInfoPojo[]) => this.log(`login ${res[0]}`)),
      catchError(this.handleError<UserInfoPojo[]>('login', []))
    );
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
