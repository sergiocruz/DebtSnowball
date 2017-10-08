import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import * as DebtActions from './debt.actions'

@Injectable()
export class DebtEffect {

  // @Effect()
  // public calculateDebt$ = this.actions$
  //   .ofType(DebtActions.ADD_DEBT)
  //   .do((data) => console.log('data', data))

  constructor(
    private actions$: Actions,
  ) { }


}
