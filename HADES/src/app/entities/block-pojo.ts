/*
 * File: /src/entities/user-info.ts
 * Created Date: Saturday May 12th 2018
 * Author: huisama
 * -----
 * Last Modified: Sat May 12 2018
 * Modified By: huisama
 * -----
 * Copyright (c) 2018 Hui
 */

enum BlockType {
    User = 0,
    Debit = 1,
    Transacation = 2,
}

export class BlockPojo {
    type: BlockType.User;

    userInfo: UserInfoPojo;
    debitInfo: DebitInfoPojo;
    TransacationInfo: TransacationPojo; 
}

export class UserInfoPojo {
    name = '';
    idc = '';
    phoneNum = '';
    address = 0;
}

export class DebitInfoPojo {
    id = '';
    fundRaiserID = '';
    fundRaiseRest = '';
    fundOvertimeTime = '';
    validation = '';
}

export class TransacationPojo {
    fromAddress = '';
    toAddress = '';
    amount = '';
    belongTo = '';
}
