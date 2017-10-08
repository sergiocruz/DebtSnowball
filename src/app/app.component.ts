import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './reducers';
import { Debt } from './debt'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  debtList$: Observable<Debt[]>

  constructor(
    public store: Store<fromRoot.State>,
  ) {}

  ngOnInit() {
    this.debtList$ = this.store
      .select('debt')
      .select('debtList')
  }


}
