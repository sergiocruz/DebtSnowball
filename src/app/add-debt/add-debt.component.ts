import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'

import { DebtService } from '../debt.service'
import { Debt } from '../debt'

@Component({
  selector: 'app-add-debt',
  templateUrl: './add-debt.component.html',
  styleUrls: ['./add-debt.component.css'],
})
export class AddDebtComponent implements OnInit {
  public debtForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public DebtService: DebtService,
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
    this.DebtService.addDebt(debt)
    this.debtForm.reset()
  }

}
