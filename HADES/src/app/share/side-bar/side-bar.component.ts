import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  routes: { name: string, link: string }[] = [
    {
      name: '首页',
      link: '/admin/index'
    },
    {
      name: '我要放款',
      link: '/admin/pool'
    },
    {
      name: '我要借款',
      link: '/admin/borrow'
    },
    {
      name: '资金记录',
      link: '/admin/chain'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
