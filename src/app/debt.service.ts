import { Injectable } from '@angular/core';
import { Debt } from './debt'

@Injectable()
export class DebtService {

  public debtList: Debt[] = []
  public totalDebtAmount: number = 0.00

  constructor() { }

  addDebt(debt: Debt) {
    this.debtList.push(debt)
    this.calculateDebt()
  }

  calculateDebt() {
    this.totalDebtAmount = this.debtList
      .map((debt: Debt) => debt.amount)
      .reduce((a, b) => a + b, 0)
  }

}
