import {
  ActionReducerMapBuilder,
  createAction,
  createReducer,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { authThunk } from "../thunks/authThunk";
import { IUser } from "../entities/User";

export type AuthActionsType =
  | PayloadAction<{ user: IUser }>
  | PayloadAction<null>;

export interface AuthState {
  user?: IUser;
  isLogged: boolean;
  isLoading: boolean;
}

export const AUTH_INITIAL_STATE: AuthState = {
  isLoading: false,
  isLogged: false,
};

export const authSelector = (state: EngageState): AuthState => state.auth;

export const signOut: PayloadActionCreator<undefined> =
  createAction("duck/auth/signOut");

function handlePendingThunk(state: AuthState): AuthState {
  return {
    ...state,
    isLoading: true,
  };
}

function handleRejectedThunk(state: AuthState): AuthState {
  return {
    ...state,
    isLoading: false,
  };
}

function handleAuth(state: AuthState, action: PayloadAction<IUser>): AuthState {
  return {
    ...state,
    user: action.payload,
    isLogged: true,
    isLoading: false,
  };
}

function handleSignOut(
  state: AuthState,
  action: PayloadAction<void>
): AuthState {
  return {
    ...state,
    user: undefined,
    isLogged: false,
    isLoading: false,
  };
}

const builderReducer = (builder: ActionReducerMapBuilder<AuthState>) =>
  builder
    .addCase(authThunk.fulfilled.type, handleAuth)
    .addCase(authThunk.rejected.type, handleRejectedThunk)
    .addCase(authThunk.pending.type, handlePendingThunk)

    .addCase(signOut.type, handleSignOut);

export const authReducer = createReducer(AUTH_INITIAL_STATE, builderReducer);
