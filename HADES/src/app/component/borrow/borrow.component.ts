import { Component, OnInit, TemplateRef } from '@angular/core';
import { DebitService } from '../../services/debit.service';
import { DebitInfoPojo } from '../../entities/block-pojo';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
          that.debits = res['data'] as DebitInfoPojo[];
        } else {
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      }
    });
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
    this.debitService.raiseDebit(fundRaiserID, this.amount, new Date().getTime() + 1000 * 60 * 60 * 12, 1, 0)
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
