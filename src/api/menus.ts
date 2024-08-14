import { getConfig } from "./config"

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
  const axiosInstance = getConfig();
  if (axiosInstance === undefined) {
    return undefined;
  }
  return axiosInstance.get("menus")
    .then(res => res.data.data.menus as Array<Menu>)
}

