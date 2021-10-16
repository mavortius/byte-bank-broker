export interface PortFolio {
  portfolio_id: string;
  portfolio_description: string;
  user_id: number;
  items: Array<PortFolioItem>;
}

export interface PortFolioItem {
  item_amount: number;
  item_price: number;
  stock_id: number;
}
