import { IProduct } from "./Product";

export interface ICart {
  product: IProduct;
  quantity: number;
  subtotal: number;
}
