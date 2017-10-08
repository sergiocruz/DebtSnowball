import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx'
import { distanceInWordsToNow } from 'date-fns'

import { State } from './store'
import { Actions, Debt, State as DebtState } from './store/debt'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private MONTH_IN_MS: number = 30 * 24 * 60 * 60 * 1000
  private debtStore: Store<DebtState>
  public paymentForm: FormGroup
  public monthlyPayment$: Observable<number>
  public debtList$: Observable<Debt[]>
  public totalDebtAmount$: Observable<number>
  public debtFreeWhen = ''

  public constructor(
    private fb: FormBuilder,
    private store: Store<State>,
  ) {
    this.debtStore = store.select(state => state.debt)
  }

  public ngOnInit(): void {
    this.monthlyPayment$ = this.debtStore.select(state => state.monthlyPayment)
    this.totalDebtAmount$ = this.debtStore.select(state => state.totalDebtAmount)
    this.debtList$ = this.debtStore.select(state => state.debtList)

    this.monthlyPayment$
      .take(1)
      .subscribe((monthlyPayment) =>
        this.paymentForm = this.fb.group({ amount: monthlyPayment.toFixed(2) })
      )

      this.paymentForm.valueChanges
        .merge(this.totalDebtAmount$)
        .debounce(() => Observable.interval(300))
        .subscribe(() => this.onSaveMonthlyPayment())

      // Run on init
      this.onSaveMonthlyPayment()
    }

  public calculateDebtFreeWhen(monthlyPayment: number, totalDebtAmount: number): string {

    if (monthlyPayment <= 0) {
      return 'not sure when... input your monthly payment'
    }

    // How many months till we're debt free
    const monthsTillDebtFree = (totalDebtAmount / monthlyPayment)

    if (monthsTillDebtFree <= 1) {
      return 'this month'
    }

    const timeInMS = monthsTillDebtFree * this.MONTH_IN_MS
    const now = new Date().getTime()

    return distanceInWordsToNow(
      new Date(now + timeInMS),
      { addSuffix: true }
    )
  }

  public onSaveMonthlyPayment(): void {
    const { amount } = this.paymentForm.value
    const monthlyPayment = parseFloat(amount)

    if (Number.isNaN(monthlyPayment)) {
      return
    }

    // Set new monthly payment in store
    this.debtStore.dispatch(new Actions.SetMonthlyPayment(monthlyPayment))

    this.totalDebtAmount$
      .take(1)
      .subscribe((totalDebtAmount) => {
        // Calculates when will be debt free
        this.debtFreeWhen = this.calculateDebtFreeWhen(monthlyPayment, totalDebtAmount)
      })

  }

}
