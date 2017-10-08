import { Action } from '@ngrx/store';
import { Debt } from './debt.interface'

export const SET_MONTHLY_PAYMENT = '[Debt] Set Monthly Payment'
export const ADD_DEBT = '[Debt] Add Debt'
export const SET_TOTAL_DEBT_AMOUNT = '[Debt] Sum Debt'

export class SetMonthlyPayment implements Action {
  readonly type = SET_MONTHLY_PAYMENT

  constructor(public payload: number) {}
}

export class AddDebt implements Action {
  readonly type = ADD_DEBT
  constructor(public payload: Debt) {}
}

export class SetDebtAmount implements Action {
  readonly type = SET_TOTAL_DEBT_AMOUNT
  constructor(public payload: number) {}
}

export type Action = SetMonthlyPayment | AddDebt | SetDebtAmount
