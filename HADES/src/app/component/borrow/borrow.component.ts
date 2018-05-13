import { Component, OnInit, TemplateRef } from '@angular/core';
import { DebitService } from '../../services/debit.service';
import { DebitInfoPojo } from '../../entities/block-pojo';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as _ from 'lodash';
import { TransacationService } from '../../services/transacation.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  debits: DebitInfoPojo[] = [];
  amount: any;
  modalRef: BsModalRef;

  constructor(private debitService: DebitService,
              private transacationService: TransacationService,
              private modalService: BsModalService) {
  }

  async ngOnInit() {
    const that = this;
    this.update();
    // try {
    //   const res = await this.debitService.fetchDebit().toPromise();
    //   const trans = await this.transacationService.fetchTransacation().toPromise();
    //   if (res && res['success'] && res['data']) {
    //     // that.debits = res['data'] as DebitInfoPojo[];
    //     const group = _.groupBy(res['data'], 'fundOvertimeTime');
    //     const tranDatas = trans['data'];
    //
    //     const values = Object.values(group);
    //
    //     const arr: DebitInfoPojo[] = [];
    //     for (const g of values) {
    //       const max = _.maxBy(g, e => e.sequanceID);
    //       max['remain'] = 0;
    //       const min = _.minBy(g, e => e.sequanceID);
    //       // const max = g.sort((a, b) => a.sequanceID < b.sequanceID ? -1 : 1)[0];
    //       // if (max.validation === 1 && max.fundRaiserRest > 0) {
    //       // arr.push(max);
    //       const result = tranDatas.filter(item => item['belongTo'] === min['id']);
    //       if (result.length > 0) {
    //         const sum = result.map(item => item['amount']).reduce((A, B) => A + B);
    //         min['remain'] = Number(min['fundRaiserRest']) - sum;
    //         max['remain'] = Number(min['fundRaiserRest']) - sum;
    //       }
    //       max['fundRaiserRest'] = Number(min['fundRaiserRest']);
    //       console.log(max);
    //       arr.push(max);
    //       // }
    //     }
    //
    //     this.debits = arr;
    //   } else {
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  async update() {
    try {
      const res = await this.debitService.fetchDebit().toPromise();
      const trans = await this.transacationService.fetchAllTransacation().toPromise();
      if (res && res['success'] && res['data']) {
        // that.debits = res['data'] as DebitInfoPojo[];
        const group = _.groupBy(res['data'], 'fundOvertimeTime');
        const tranDatas = trans['data'];

        const values = Object.values(group);

        const arr: DebitInfoPojo[] = [];
        for (const g of values) {
          const max = _.maxBy(g, e => e.sequanceID);
          max['remain'] = 0;
          const min = _.minBy(g, e => e.sequanceID);
          // const max = g.sort((a, b) => a.sequanceID < b.sequanceID ? -1 : 1)[0];
          // if (max.validation === 1 && max.fundRaiserRest > 0) {
          // arr.push(max);
          const result = tranDatas.filter(item => item['belongTo'] === min['id']);
          console.log(result);
          if (result.length > 0) {
            const sum = result.map(item => item['amount']).reduce((A, B) => A + B);
            max['remain'] = sum;
          }
          max['fundRaiserRest'] = Number(min['fundRaiserRest']);
          console.log(max);
          arr.push(max);
          // }
        }

        this.debits = arr;
        console.log(this.debits);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  }

  debitState(pojo: DebitInfoPojo) {
    if (pojo.validation === 0) {
      return '借款失败';
    } else if (pojo.validation === 1 && pojo.fundRaiserRest === 0) {
      return '成功借款';
    } else if (pojo.validation === 1 && pojo['fundRaiserRest'] === pojo['remain']) {
      return '成功借款';
    } else {
      return '正在借款';
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onReq() {
    if (!this.amount || isNaN(Number(this.amount)) || Number(this.amount) <= 0) {
      return;
    }
    const that = this;
    const fundRaiserID = JSON.parse(sessionStorage.getItem('user'))['name'] || '';
    this.debitService.raiseDebit(fundRaiserID, this.amount, String(new Date().getTime() + 1000 * 60 * 60 * 12), 1, 0)
      .subscribe(res => {
        console.log(res);
        try {
          if (res && res['success']) {
            console.log('借款成功!');
            that.amount = null;
            this.modalRef.hide();
            // TODO update list
            that.update();
          } else {
            console.log(res);
          }
        } catch (e) {
          console.warn(e);
        }
      });
  }

  pay(debit: DebitInfoPojo) {
    // TODO
  }

}
