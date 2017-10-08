import { Routes } from '@angular/router'

import { AddDebtComponent } from './pages/add-debt/add-debt.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'

export const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'add-debt', component: AddDebtComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: NotFoundComponent }
]
