import axios from "axios";
import { getConfig } from "./config";

export type User = {
  token: string,
  user: {
    user_id: number,
    user_name: string,
  },
  profileSetting: {
    profile_picture: string,
    dark_mode: boolean,
  }
}

type Data = {
  data: User;
}

const URL = "http://ec2-100-21-24-56.us-west-2.compute.amazonaws.com:8080/antares-backend/public/api/";

export const login = async (req: { email: string, password: string }) => {
  return axios.post<Data>(URL + "login", {
    email: req.email,
    password: req.password
  })
    .then(res => res.data.data)
}

export const googleLogin = async (req: { email: string, password: string }) => {
  return axios.post<Data>(URL + "google-login", {
    email: req.email,
    password: req.password
  })
    .then(res => res.data.data)
}

export const getUser = async () => {
  const axiosInstance = getConfig();
  if (axiosInstance === undefined) {
    return undefined;
  }
  return axiosInstance.get<User>("user-info")
    .then(res => res.data)
}
