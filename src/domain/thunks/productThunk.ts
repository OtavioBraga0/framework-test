import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { getProducts } from "../../data/services/product";
import { IProduct } from "../entities/Product";

export interface ThunkApi {
  dispatch: Dispatch;
  state: EngageState;
  rejectValue: string;
}

export const ProductActions = {
  GET_ALL_PRODUCTS: "thunk/product/getAllProductsThunk",
};

export const getAllProductsThunk = createAsyncThunk<IProduct[], void, ThunkApi>(
  ProductActions.GET_ALL_PRODUCTS,
  async (payload, thunkAPI) => {
    try {
      return await getProducts();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
