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

    await this.update();
  }

  async update() {
    try {
      this.displayList = [];

      // const result: any = await this.debiteService.fetchDebit().toPromise();
      const result: any = await this.debiteService.fetchAllDebit().toPromise();
      const trans = await this.transacationService.fetchAllTransacation().toPromise();
      console.log(trans);
      const user = JSON.parse(sessionStorage.getItem('user'))['name'] || '';
      const jsons = result.data.filter(item => item['fundRaiserID'] !== user);
      // const jsons = result.data;
      // const group = _.groupBy(result.data, 'fundOvertimeTime');
      const group = _.groupBy(jsons, 'fundOvertimeTime');

      const values = Object.values(group);

      const arr: DebitInfoPojo[] = [];
      for (const g of values) {
        let max = _.maxBy(g, e => e.sequanceID);
        // const max = g.sort((a, b) => a.sequanceID < b.sequanceID ? -1 : 1)[0];
        console.log(g);
        const datas = trans['data'].filter(item => item['belongTo'] === g[0].id);
        console.log(datas);
        let gett = 0;
        if (datas.length > 0) {
          gett = datas.map(item => item['amount']).reduce((A, B) => {
            return A + B;
          });
        }
        console.log(gett);
        max['total'] = g[0]['fundRaiserRest'];
        max.fundRaiserRest = g[0]['fundRaiserRest'] - gett;
        if (max.validation === 1 && max.fundRaiserRest > 0) {
          arr.push(max);
        }
      }

      this.displayList = arr;
    } catch (e) {
      console.log(e);
    }
  }

  async updateDebit(pojo: DebitInfoPojo) {
    // 更新当前debit
    const result = await this.transacationService.fetchAllTransacation().toPromise();
    const data = result['data'];
    const trans = data.filter(item => item['belongTo'] === pojo.id);
    let gett = 0;
    if (trans.length > 0) {
      gett = trans.map(item => item['amount']).reduce((A, B) => {
        return A + B;
      });
    }
    pojo['fundRaiserRest'] = Number(pojo['total']) - gett;
  }

  async lendMoney(pojo: DebitInfoPojo, amount: number) {
    await this.updateDebit(pojo);
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
