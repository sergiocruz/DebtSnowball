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
  switch(action.type) {
    case actions.SET_MONTHLY_PAYMENT:
      return {
        ...state,
        monthlyPayment: action.payload,
      }

    case actions.ADD_DEBT:
      const debtList = state.debtList.concat([ action.payload ])
      return {
        ...state,
        debtList,
        totalDebtAmount: debtList
          .map(debt => debt.amount)
          .reduce((a, b) => a + b, 0)
      }

    default:
      return state
  }
}
