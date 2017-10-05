import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import debounce from 'lodash/debounce'
import * as moment from 'moment'
import { Observable } from 'rxjs/Rx'

import { DebtService } from './debt.service'
import { Debt } from './debt'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private MONTH_IN_MS: number = 30 * 24 * 60 * 60 * 1000
  public debtForm: FormGroup
  public paymentForm: FormGroup
  public hasDebtForm: boolean = false
  public totalDebt: number = 0.00
  public debtFreeWhen: string = ''

  public constructor(
    private fb: FormBuilder,
    public DebtService: DebtService,
  ) {}

  public ngOnInit() {
    this.debtForm = this.fb.group({ name: '', amount: '' })
    this.paymentForm = this.fb.group({ amount: '' })

    Observable
      .merge(this.debtForm.valueChanges, this.paymentForm.valueChanges)
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

  public onAddDebt() {
    const { value: { name, amount: amountStr } } = this.debtForm
    const amount = parseFloat(amountStr)

    if (Number.isNaN(amount)) {
      this.debtForm.controls.amount.reset()
      return
    }

    const debt: Debt = { name, amount }
    this.DebtService.addDebt(debt)
    this.debtForm.reset()
  }

  public onSaveMonthlyPayment() {
    this.debtFreeWhen = this.calculateDebtFreeWhen()
  }

  public toggleDebtForm($event) {
    $event.preventDefault()
    this.hasDebtForm = !this.hasDebtForm
  }

}
