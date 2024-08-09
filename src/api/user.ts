import axiosInstance from "./config"

export type User = {
  token: string,
  user: {
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

export const login = async (req: { email: string, password: string }) => {
  return axiosInstance.post<Data>("login", {
    email: req.email,
    password: req.password
  })
    .then(res => res.data.data)
}

