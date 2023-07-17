import axios from "axios";

import endpoints from "../../config/endpoints.json";
import { IProduct } from "../../domain/entities/Product";

export function getProducts(): Promise<IProduct[]> {
  return axios.get(endpoints.product.getAll);
}
