import { Routes } from '@angular/router'

import { AddDebtComponent } from './pages/add-debt/add-debt.component'

export const appRoutes: Routes = [
  { path: '**', redirectTo: '/dashboard' },
  { path: 'dashboard', component: AddDebtComponent },
]
