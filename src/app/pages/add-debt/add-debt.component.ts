import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from '../../store';
import { Actions, Debt, State as DebtState } from '../../store/debt'

@Component({
  selector: 'app-add-debt',
  templateUrl: './add-debt.component.html',
  styleUrls: ['./add-debt.component.css'],
})
export class AddDebtComponent implements OnInit {
  public debtForm: FormGroup
  public debtList$: Observable<Debt[]>
  private debtStore: Store<DebtState>

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
  ) {
    this.debtStore = store.select(state => state.debt)
  }

  ngOnInit() {
    this.debtForm = this.fb.group({ name: '', amount: '' })
    this.debtList$ = this.debtStore.select(store => store.debtList)
  }

  public onAddDebt(): void {
    const { value: { name, amount: amountStr } } = this.debtForm
    const amount = parseFloat(amountStr)

    if (Number.isNaN(amount)) {
      this.debtForm.controls.amount.reset()
      return
    }

    const debt: Debt = { name, amount }
    this.debtStore.dispatch(new Actions.AddDebt(debt))
    this.debtForm.reset()
  }

}
