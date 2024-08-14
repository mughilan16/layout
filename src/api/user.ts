import axiosInstance from "./config"

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

export const login = async (req: { email: string, password: string }) => {
  return axiosInstance.post<Data>("login", {
    email: req.email,
    password: req.password
  })
    .then(res => res.data.data)
}

export const googleLogin = async (req: { email: string, password: string }) => {
  return axiosInstance.post<Data>("google-login", {
    email: req.email,
    password: req.password
  })
    .then(res => res.data.data)
}

export const getUser = async (req: { token: string, userId: string }) => {
  console.log(req.userId)
  return axiosInstance.get<User>(`user-popover-info/${req.userId}`)
    .then(res => { console.log(res.data); return res.data })
}
