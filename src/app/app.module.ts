import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { DebtService } from './debt.service';
import { AddDebtComponent } from './add-debt/add-debt.component';
import { DashboardComponent } from './dashboard/dashboard.component'

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-debt', component: AddDebtComponent },
  { path: '**', component: NotFoundComponent }
];

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
  ],
  providers: [DebtService],
  bootstrap: [AppComponent],
})
export class AppModule { }
