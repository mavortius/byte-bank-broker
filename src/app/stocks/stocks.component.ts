import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

import { StocksService } from './stocks.service';

const TYPING_WAIT_TIME = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent {
  stocksInput = new FormControl();
  allStocks$ = this.service.getStocks().pipe(tap(() => console.log('All stocks flow')));
  filteredStocks$ = this.stocksInput.valueChanges
    .pipe(
      debounceTime(TYPING_WAIT_TIME),
      tap(() => console.log('Filtered stocks flow')),
      tap(console.log),
      filter((value) => value.length >= 3 || !value.length),
      distinctUntilChanged(),
      switchMap((value) => this.service.getStocks(value))
    );
  stocks$ = merge(this.allStocks$, this.filteredStocks$);

  constructor(private service: StocksService) {
  }
}
