import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { IUser } from "../entities/User";
import { signIn } from "../../data/services/auth";
import { toast } from "react-toastify";

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
    const user = await signIn(payload.email, payload.password);
    console.log(user);

    if (user.length <= 0) {
      throw new Error("User not found");
    }
    return user[0];
  } catch (error: any) {
    toast(`User not found`, { type: `error` });
    return thunkAPI.rejectWithValue(error.message);
  }
});
