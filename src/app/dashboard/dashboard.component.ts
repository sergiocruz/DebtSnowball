import { Component, OnInit } from '@angular/core';
import debounce from 'lodash/debounce'
import * as moment from 'moment'
import { Observable } from 'rxjs/Rx'
import { FormBuilder, FormGroup } from '@angular/forms'

import { DebtService } from '../debt.service'
import { Debt } from '../debt'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private MONTH_IN_MS: number = 30 * 24 * 60 * 60 * 1000
  public paymentForm: FormGroup
  public totalDebt: number = 0.00
  public debtFreeWhen: string = ''

  public constructor(
    private fb: FormBuilder,
    public DebtService: DebtService,
  ) {}

  public ngOnInit(): void {
    this.paymentForm = this.fb.group({ amount: '' })

    this.paymentForm.valueChanges
      .debounce(() => Observable.interval(300))
      .subscribe(() => this.onSaveMonthlyPayment())
  }

  public calculateDebtFreeWhen(): string {
    const { amount } = this.paymentForm.value
    const monthlyPayment = parseFloat(amount)

    if (Number.isNaN(monthlyPayment) || !monthlyPayment) {
      this.paymentForm.controls.amount.setValue("")
      return 'not sure when... input your monthly payment'
    }

    this.paymentForm.controls.amount.setValue(monthlyPayment.toFixed(2))
    const monthsTillDebtFree = this.DebtService.totalDebtAmount / monthlyPayment

    if (monthsTillDebtFree <= 1) {
      return 'this month'
    }

    const timeInMS = monthsTillDebtFree * this.MONTH_IN_MS
    return moment().add(timeInMS).fromNow()
  }

  public onSaveMonthlyPayment(): void {
    this.debtFreeWhen = this.calculateDebtFreeWhen()
  }

}
