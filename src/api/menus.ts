import axios from "axios";
import qs from "qs"

let data = qs.stringify({
  email: "wpsadmin@wps.com",
  password: "wpsops2019live",
});

let config = {
  maxBodyLength: Infinity,
  baseURL:
    "http://ec2-100-21-24-56.us-west-2.compute.amazonaws.com:8080/antares-backend/public/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Bearer 17|kCbWP7B6ebKNDvaRkWAJy6mzaYxI2hvveL8yBxAo",
  },
  data: data,
};

const axiosInstance = axios.create(config);

export type Menu = {
  id: number
  order: number,
  menu_id: string,
  menu_name: string,
  dev_page_name: string,
  icon: string,
  target_url: string,
  role: string,
  sub_roles: string,
  publisher: string,
  users: string,
  created_at: string,
  updated_at: string,
  sub_tree: Menu[] | null,
  users_exclude: string,
  parent_id: string,
  deleted_at: string
}

export const getMenus = async () => {
  return axiosInstance.get("menus")
    .then(res => res.data.data.menus as Array<Menu>)
}

