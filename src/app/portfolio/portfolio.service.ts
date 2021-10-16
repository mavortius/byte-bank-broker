import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PortFolio } from './model/portfolio';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly portfoliosUrl = `${environment.api}/portfolios`;
  constructor(private httpClient: HttpClient) {}

  getPortFolio(id: string): Observable<PortFolio> {
    return this.httpClient.get<PortFolio>(`${this.portfoliosUrl}/${id}`);
  }

  putPortFolio(id: string, portfolio: PortFolio): Observable<PortFolio> {
    return this.httpClient.put<PortFolio>(
      `${this.portfoliosUrl}/${id}`,
      portfolio
    );
  }
}
