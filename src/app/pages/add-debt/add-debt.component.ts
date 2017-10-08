import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../store/reducers';
import { Actions, Debt } from '../../store/debt'

@Component({
  selector: 'app-add-debt',
  templateUrl: './add-debt.component.html',
  styleUrls: ['./add-debt.component.css'],
})
export class AddDebtComponent implements OnInit {
  public debtForm: FormGroup
  public debtList$: Observable<Debt[]>

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.debtForm = this.fb.group({ name: '', amount: '' })
  }

  public onAddDebt(): void {
    const { value: { name, amount: amountStr } } = this.debtForm
    const amount = parseFloat(amountStr)

    if (Number.isNaN(amount)) {
      this.debtForm.controls.amount.reset()
      return
    }

    const debt: Debt = { name, amount }
    this.store.select('debt').dispatch(new Actions.AddDebt(debt))
    this.debtForm.reset()
  }

}
