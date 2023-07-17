import axios, { AxiosResponse } from "axios";

export const initializeAxios = (): void => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
};

axios.interceptors.response.use((response: AxiosResponse) => response.data);
