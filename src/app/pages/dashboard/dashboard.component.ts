import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { distanceInWordsToNow } from 'date-fns'
import debounce from 'lodash/debounce'
import { Observable } from 'rxjs/Rx'
import { FormBuilder, FormGroup } from '@angular/forms'

import { State } from '../../store'
import { Actions, Debt, State as DebtState } from '../../store/debt'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private MONTH_IN_MS: number = 30 * 24 * 60 * 60 * 1000
  private debtStore: Store<DebtState>
  public paymentForm: FormGroup
  public monthlyPayment$: Observable<number>
  public debtList$: Observable<Debt[]>
  public totalDebtAmount = 0.00
  public debtFreeWhen = ''

  public constructor(
    private fb: FormBuilder,
    private store: Store<State>,
  ) {
    this.debtStore = store.select(state => state.debt)
  }

  public ngOnInit(): void {
    this.monthlyPayment$ = this.debtStore.select(state => state.monthlyPayment)
    this.debtList$ = this.debtStore.select(state => state.debtList)

    this.debtStore.select(state => state.totalDebtAmount)
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

    // Set new monthly payment in store
    this.debtStore.dispatch(new Actions.SetMonthlyPayment(monthlyPayment))

    // How many months till we're debt free
    const monthsTillDebtFree = this.totalDebtAmount / monthlyPayment

    if (monthsTillDebtFree <= 1) {
      return 'this month'
    }

    const timeInMS = monthsTillDebtFree * this.MONTH_IN_MS
    const now = new Date().getTime()
    return distanceInWordsToNow(
      new Date(now + timeInMS),
      {addSuffix: true}
    )
  }

  public onSaveMonthlyPayment(): void {
    this.debtFreeWhen = this.calculateDebtFreeWhen()
  }

}
