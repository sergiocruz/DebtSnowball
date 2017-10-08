import { Debt } from './debt.interface'
import * as actions from './debt.actions'

export interface State {
  monthlyPayment: number,
  debtList: Debt[],
  totalDebtAmount: number,
}

const initialState: State = {
  monthlyPayment: 100.00,
  debtList: [],
  totalDebtAmount: 0.00,
}

export function reducer(state: State = initialState, action: actions.Action): State {
  switch (action.type) {
    case actions.SET_MONTHLY_PAYMENT:
      return {
        ...state,
        monthlyPayment: action.payload,
      }

    case actions.ADD_DEBT:
      return {
        ...state,
        debtList: state.debtList.concat([ action.payload ]),
      }

    case actions.SET_TOTAL_DEBT_AMOUNT:
      return {
        ...state,
        totalDebtAmount: action.payload,
      }

    default:
      return state
  }
}
