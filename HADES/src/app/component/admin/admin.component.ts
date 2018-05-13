import { Component, OnInit } from '@angular/core';
import { DebitInfoPojo, TransacationPojo } from '../../entities/block-pojo';
import { DebitService } from '../../services/debit.service';
import { TransacationService } from '../../services/transacation.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  poolOptions: any;

  debits: DebitInfoPojo[] = [];
  trans: TransacationPojo[] = [];

  debitInfos: DebitInfoPojo[] = [];

  constructor(private debitService: DebitService,
              private transacationService: TransacationService) {
  }

  ngOnInit() {
    // this.initPool();
    this.initDeal();
    // this.initInform();
  }

  initPool() {
    this.poolOptions = {
      title: {
        text: '资金池',
        subtext: '',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  initDeal() {
    const that = this;
    this.debitService.fetchDebit().subscribe(res => {
      try {
        console.log(res);
        if (res && res['success'] && res['data']) {
          const group = _.groupBy(res['data'], 'fundOvertimeTime');
          const result = [];
          const values = Object.values(group);
          for (const g of values) {
            const max = _.maxBy(g, e => e.sequanceID);
            const min = _.minBy(g, e => e.sequanceID);
            console.log(max);
            if (max['repaid'] !== 1) {
              result.push(min);
            }
          }

          const debits = res['data'] as DebitInfoPojo[];
          that.debitInfos = [...debits];
          // const tmp = [];
          // const result = [];
          // const debTime = debits.map(item => item.fundOvertimeTime);
          // for (let i = 0, len = debTime.length; i < len; i++) {
          //   if (tmp.indexOf(debTime[i]) < 0) {
          //     tmp.push(debTime[i]);
          //     result.push(debits[i]);
          //   }
          // }
          // console.log(result);
          that.debits = result;
          console.log(result);
        }
      } catch (e) {
        console.warn(e);
      }
    });
  }

  formatTime(time) {
    try {
      return new Date(Number(time)).toDateString();
    } catch (e) {
      console.log(e);
    }
    return time;
  }

  getDebitState(debit: DebitInfoPojo): string {
    if (this.debitInfos.length > 0) {
      const result = this.debitInfos.filter(item => item.fundOvertimeTime === debit.fundOvertimeTime);
      if (result.length > 0) {
        const len = result.length;
        if (result[len - 1].fundRaiserRest === 0) {
          return '待还';
        }
        return '待借';
      }
    }
    return 'UnKnown';
  }

  initInform() {
    const that = this;
    this.transacationService.fetchTransacation().subscribe(res => {
      try {
        console.log(res);
        if (res && res['success'] && res['data']) {
          that.trans = res['data'] as TransacationPojo[];
        }
      } catch (e) {
        console.warn(e);
      }
    });
  }
}
