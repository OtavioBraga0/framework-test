import axios from "axios";
import { IUser } from "../../domain/entities/User";

import endpoints from "../../config/endpoints.json";

export function signIn(email: string, password: string): Promise<IUser[]> {
  return axios.get(endpoints.user.get, {
    params: {
      email,
      password,
    },
  });
}
