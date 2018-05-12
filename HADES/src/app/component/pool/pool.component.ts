import { Component, OnInit } from '@angular/core';
import { DebitService } from '../../services/debit.service';
import { TransacationService } from '../../services/transacation.service';

import * as _ from 'lodash';
import { DebitInfoPojo } from '../../entities/block-pojo';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {

  // options: any;

  constructor(
    private debiteService: DebitService,
    private transacationService: TransacationService,
  ) {
  }

  displayList: DebitInfoPojo[] = [];

  async ngOnInit() {
    // this.options = {
    //   title: {
    //     text: '资金池',
    //     subtext: '',
    //     x: 'center'
    //   },
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: '{a} <br/>{b} : {c} ({d}%)'
    //   },
    //   legend: {
    //     orient: 'vertical',
    //     left: 'left',
    //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    //   },
    //   series: [
    //     {
    //       name: '访问来源',
    //       type: 'pie',
    //       radius: '55%',
    //       center: ['50%', '60%'],
    //       data: [
    //         { value: 335, name: '直接访问' },
    //         { value: 310, name: '邮件营销' },
    //         { value: 234, name: '联盟广告' },
    //         { value: 135, name: '视频广告' },
    //         { value: 1548, name: '搜索引擎' }
    //       ],
    //       itemStyle: {
    //         emphasis: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: 'rgba(0, 0, 0, 0.5)'
    //         }
    //       }
    //     }
    //   ]
    // };


    try {
      this.displayList = [];

      const result: any = await this.debiteService.fetchDebit().toPromise();
      const json = result.data;
      const group = _.groupBy(result.data, 'fundOvertimeTime');

      const values = Object.values(group);

      const arr: DebitInfoPojo[] = [];
      for (const g of values) {
        const max = _.maxBy(g, e => e.sequanceID);
        // const max = g.sort((a, b) => a.sequanceID < b.sequanceID ? -1 : 1)[0];
        if (max.validation === 1 && max.fundRaiserRest > 0) {
          arr.push(max);
        }
      }

      this.displayList = arr;
    } catch (e) {
      console.log(e);
    }

  }

  async lendMoney(pojo: DebitInfoPojo, amount: number) {
    await this.transacationService.addTransacation(pojo.fundRaiserID,
       amount < pojo.fundRaiserRest ? amount : pojo.fundRaiserRest, pojo.id).toPromise();

    if (pojo.fundRaiserRest <= amount) {
      await this.debiteService.raiseDebit(pojo.fundRaiserID, 0, pojo.fundOvertimeTime, 1, 0)
      .subscribe(res => {
        console.log(res);
      });
      _.remove(this.displayList, pojo);
    } else {
      pojo.fundRaiserRest -= amount;
    }
  }
}
