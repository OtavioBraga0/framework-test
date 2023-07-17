import {
  configureStore,
  EnhancedStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { ReducersMapObject } from "redux";
import { AuthActionsType, authReducer, AuthState } from "./ducks/authReducer";
import {
  ProductActionsType,
  ProductState,
  productReducer,
} from "./ducks/productReducer";
import { CartActionsType, CartState, cartReducer } from "./ducks/cartReducer";

export interface EngageState {
  readonly auth: AuthState;
  readonly product: ProductState;
  readonly cart: CartState;
}

export type EngageActions = AuthActionsType &
  ProductActionsType &
  CartActionsType;

export type EngageStore = EnhancedStore<EngageState, EngageActions>;
export const rootReducer: ReducersMapObject<EngageState, EngageActions> = {
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
};

const combinedReducers = combineReducers(rootReducer);

export const store = configureStore({
  reducer: combinedReducers,
});

export type AppDispatch = typeof store.dispatch;
