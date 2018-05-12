import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('stepper') stepper: MatHorizontalStepper;

  isFirstLoading = false;
  isSecondLoading = false;


  constructor() {
  }

  ngOnInit() {
  }

  validateFirst() {
    // todo
    console.log('validateFirst');
    this.isFirstLoading = true;
    this.stepper.next();
  }

  validateSecond() {
    // todo
    console.log('validateSecond');
    this.isSecondLoading = true;
    this.stepper.next();
  }

}
