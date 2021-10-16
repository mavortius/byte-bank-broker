import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component';
import { SharedModule } from '../shared/shared.module';
import { StocksCardComponent } from './stocks-card/stocks-card.component';


@NgModule({
  declarations: [StocksComponent, StocksCardComponent],
  imports: [
    CommonModule,
    StocksRoutingModule,
    SharedModule
  ]
})
export class StocksModule { }
