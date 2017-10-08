import { Action } from '@ngrx/store';
import { Debt } from '../../debt'

export const SET_MONTHLY_PAYMENT = '[Debt] Set Monthly Payment'
export const ADD_DEBT = '[Debt] Add Debt'

export class SetMonthlyPayment implements Action {
  readonly type = SET_MONTHLY_PAYMENT

  constructor(public payload: number) {}
}

export class AddDebt implements Action {
  readonly type = ADD_DEBT
  constructor(public payload: Debt) {}
}

export type Action = SetMonthlyPayment | AddDebt
