export interface IUser {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

export interface IAuth {
  email: string;
  password: string;
}

export const DEFAULT_USER: IUser = {
  id: 0,
  name: "",
  avatar: "",
  email: "",
};
