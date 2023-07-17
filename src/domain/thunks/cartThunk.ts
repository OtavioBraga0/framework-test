import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { finishSale } from "../../data/services/cart";

export interface ThunkApi {
  dispatch: Dispatch;
  state: EngageState;
  rejectValue: string;
}

export const ProductActions = {
  FINISH_SALE: "thunk/cart/finishSaleThunk",
};

export const finishSaleThunk = createAsyncThunk<void, void, ThunkApi>(
  ProductActions.FINISH_SALE,
  async (payload, thunkAPI) => {
    try {
      const cart = thunkAPI.getState().cart;
      await finishSale({ items: cart.cart, total: cart.total });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
