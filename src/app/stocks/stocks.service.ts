import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Stock, Stocks, StocksApi } from './model/stocks';

const resourceUrl = `${environment.api}/stocks`;

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private http: HttpClient) {
  }

  private static sortByCode(stock1: Stock, stock2: Stock) {
    if (stock1.code > stock2.code) {
      return 1;
    } else if (stock1.code < stock2.code) {
      return -1;
    } else {
      return 0;
    }
  }

  getStocks(value?: string): Observable<Stocks> {
    const params = value ? new HttpParams().append('value', value) : undefined;
    return this.http.get<StocksApi>(resourceUrl, { params })
      .pipe(
        tap((api) => console.log(api)),
        pluck('payload'),
        map((stocks: Stocks) => stocks.sort((s1, s2) => StocksService.sortByCode(s1, s2)))
      );
  }
}
