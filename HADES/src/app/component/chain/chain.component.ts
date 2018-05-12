import { Component, OnInit } from '@angular/core';
import { TransacationService } from '../../services/transacation.service';
import { TransacationPojo } from '../../entities/block-pojo';

@Component({
  selector: 'app-chain',
  templateUrl: './chain.component.html',
  styleUrls: ['./chain.component.css']
})
export class ChainComponent implements OnInit {

  trans: TransacationPojo[] = [];

  constructor(private transacationService: TransacationService) {
  }

  ngOnInit() {
    const that = this;
    this.transacationService.fetchAllTransacation().subscribe(res => {
      console.log(res);
      try {
        if (res && res['success'] && res['data']) {
          const trans = res['data'] as TransacationPojo[];
          const user = JSON.parse(sessionStorage.getItem('user'))['name'] || '';
          for (const tran of trans) {
            if (tran.from === user || tran.to === user) {
              that.trans.push(tran);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

}
