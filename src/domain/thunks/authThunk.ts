import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { IUser } from "../entities/User";
import { signIn } from "../../data/services/auth";

export interface ThunkApi {
  dispatch: Dispatch;
  state: EngageState;
  rejectValue: string;
}

export const AuthActions = {
  AUTH: "thunk/auth/authThunk",
};

export const authThunk = createAsyncThunk<
  IUser,
  { email: string; password: string },
  ThunkApi
>(AuthActions.AUTH, async (payload, thunkAPI) => {
  try {
    return (await signIn(payload.email, payload.password))[0];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
