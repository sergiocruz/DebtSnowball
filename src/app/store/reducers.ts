import { ActionReducerMap } from '@ngrx/store'
import * as fromDebt from './debt'

export interface State {
  debt: fromDebt.State,
}

export const reducers: ActionReducerMap<State> = {
  debt: fromDebt.reducer
}
