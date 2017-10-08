import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'

import { State } from '../reducers'
import * as DebtActions from './debt.actions'
import { Debt } from './debt.interface'

@Injectable()
export class DebtEffect {

  /**
   * Calculates total debt amount when new debts are added
   * @memberOf DebtEffect
   */
  @Effect()
  public calculateDebt$ = this.actions$
    .ofType(DebtActions.ADD_DEBT)
    .withLatestFrom(this.store$.select((state: State) => state.debt.debtList))
    .map(([action, debtList]) => {

      // Calculate amount
      const totalAmount: number = debtList
        .map((debt: Debt) => debt.amount)
        .reduce((a: number, b: number) => a + b, 0)

      return new DebtActions.SetDebtAmount(totalAmount)
    })

  constructor(
    private actions$: Actions,
    private store$: Store<State>,
  ) { }

}
