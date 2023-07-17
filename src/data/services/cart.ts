import axios from "axios";

import endpoints from "../../config/endpoints.json";
import { ICart } from "../../domain/entities/Cart";

export function finishSale(sale: {
  items: ICart[];
  total: number;
}): Promise<void> {
  return axios.post(endpoints.cart.post, sale);
}
