import { Component, OnInit, TemplateRef } from '@angular/core';
import { DebitService } from '../../services/debit.service';
import { DebitInfoPojo } from '../../entities/block-pojo';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as _ from 'lodash';

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
    private modalService: BsModalService) {
  }

  ngOnInit() {
    const that = this;
    this.debitService.fetchDebit().subscribe(res => {
      console.log(res);
      try {
        if (res && res['success'] && res['data']) {
          // that.debits = res['data'] as DebitInfoPojo[];
          const group = _.groupBy(res['data'], 'fundOvertimeTime');

          const values = Object.values(group);

          const arr: DebitInfoPojo[] = [];
          for (const g of values) {
            const max = _.maxBy(g, e => e.sequanceID);
            // const max = g.sort((a, b) => a.sequanceID < b.sequanceID ? -1 : 1)[0];
            // if (max.validation === 1 && max.fundRaiserRest > 0) {
              arr.push(max);
            // }
          }

          this.debits = arr;

        } else {
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  debitState(pojo: DebitInfoPojo) {
    if (pojo.validation === 0) {
      return '借款失败';
    } else if (pojo.validation === 1 && pojo.fundRaiserRest === 0) {
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
          } else {
            console.log(res);
          }
        } catch (e) {
          console.warn(e);
        }
      });
  }

}
