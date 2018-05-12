/*
 * File: /src/entities/user-info.ts
 * Created Date: Saturday May 12th 2018
 * Author: huisama
 * -----
 * Last Modified: Sun May 13 2018
 * Modified By: huisama
 * -----
 * Copyright (c) 2018 Hui
 */

export enum BlockType {
  User = 0,
  Debit = 1,
  Transacation = 2,
}

export class BlockPojo {
  type: BlockType = BlockType.User;

  userInfo: UserInfoPojo;
  debitInfo: DebitInfoPojo;
  transacationInfo: TransacationPojo;
}

export class UserInfoPojo {
  name = '';
  idc = '';
  phoneNum = '';
  address = '';
  password = '';
}

export class DebitInfoPojo {
  id = 0;
  fundRaiserID = '';
  fundRaiserRest = 0.0;
  sequanceID = 0;
  fundOvertimeTime = '';
  validation = 0;
  repaid = 0;
}

export class TransacationPojo {
  id = '';
  from = '';
  to = '';
  amount = 0;
  belongTo = 0;
}
