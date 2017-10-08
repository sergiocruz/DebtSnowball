import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { AddDebtComponent } from './pages/add-debt/add-debt.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { DebtService } from './debt.service'
// import { reducers } from './reducers'
import { reducer as debtReducer } from './reducers/debt/reducer'

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-debt', component: AddDebtComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AddDebtComponent,
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    StoreDevtoolsModule,
    StoreModule.forRoot({ debt: debtReducer }),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : [],
  ],
  providers: [DebtService],
  bootstrap: [AppComponent],
})
export class AppModule { }
