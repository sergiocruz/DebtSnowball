import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { AddDebtComponent } from './pages/add-debt/add-debt.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { Effects, Reducers } from './store'
import { appRoutes } from './app.routes'

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
    StoreModule.forRoot(Reducers),
    EffectsModule.forRoot(Effects),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
