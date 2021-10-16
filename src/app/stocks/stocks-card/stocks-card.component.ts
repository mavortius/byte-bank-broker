import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stocks-card',
  templateUrl: './stocks-card.component.html',
  styleUrls: ['./stocks-card.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StocksCardComponent implements OnInit {
  @Input() stock: any;

  constructor() {}

  ngOnInit(): void {}
}
