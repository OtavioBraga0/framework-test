import {
  ActionReducerMapBuilder,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { getAllProductsThunk } from "../thunks/productThunk";
import { IProduct } from "../entities/Product";

export type ProductActionsType = PayloadAction<null>;

export interface ProductState {
  products: IProduct[];
  isLoading: boolean;
}

export const PRODUCT_INITIAL_STATE: ProductState = {
  products: [],
  isLoading: false,
};

export const productSelector = (state: EngageState): ProductState =>
  state.product;

function handlePendingThunk(state: ProductState): ProductState {
  return {
    ...state,
    isLoading: true,
  };
}

function handleRejectedThunk(state: ProductState): ProductState {
  return {
    ...state,
    isLoading: false,
  };
}

function handleGetAllProducts(
  state: ProductState,
  action: PayloadAction<IProduct[]>
): ProductState {
  return {
    ...state,
    products: action.payload,
    isLoading: false,
  };
}

const builderReducer = (builder: ActionReducerMapBuilder<ProductState>) =>
  builder
    .addCase(getAllProductsThunk.fulfilled.type, handleGetAllProducts)
    .addCase(getAllProductsThunk.rejected.type, handleRejectedThunk)
    .addCase(getAllProductsThunk.pending.type, handlePendingThunk);

export const productReducer = createReducer(
  PRODUCT_INITIAL_STATE,
  builderReducer
);
