import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import debounce from 'lodash/debounce'
import * as moment from 'moment'
import { Observable } from 'rxjs/Rx'
import { FormBuilder, FormGroup } from '@angular/forms'

import * as fromRoot from '../../reducers'
import * as DebtActions from '../../reducers/debt/actions'
import { DebtService } from '../../debt.service'
import { Debt } from '../../debt'

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
  public monthlyPayment$: Observable<number>
  public debtList$: Observable<Debt[]>
  public totalDebtAmount: number = 0.00

  public constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    public DebtService: DebtService,
  ) {}

  public ngOnInit(): void {
    this.monthlyPayment$ = this.store.select('debt')
      .select('monthlyPayment')

    this.debtList$ = this.store.select('debt')
      .select('debtList')

    this.store.select('debt')
      .select('totalDebtAmount')
      .subscribe((totalDebtAmount) => this.totalDebtAmount = totalDebtAmount)

    this.monthlyPayment$
      .take(1)
      .subscribe((monthlyPayment) => {
        this.paymentForm = this.fb.group({
          amount: monthlyPayment.toFixed(2),
        })
      })

      this.paymentForm.valueChanges
        .debounce(() => Observable.interval(300))
        .subscribe(() => this.onSaveMonthlyPayment())

      // Run on init
      this.onSaveMonthlyPayment()
    }

  public calculateDebtFreeWhen(): string {
    const { amount } = this.paymentForm.value
    const monthlyPayment = parseFloat(amount)

    if (Number.isNaN(monthlyPayment) || !monthlyPayment) {
      return 'not sure when... input your monthly payment'
    }

    this.store.select('debt')
      .dispatch(new DebtActions.SetMonthlyPayment(monthlyPayment))

    const monthsTillDebtFree = this.totalDebtAmount / monthlyPayment

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
