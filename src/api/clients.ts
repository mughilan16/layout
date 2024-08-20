import axios from "axios";

export type Client = {
  comp_id: number,
  comp_name: string,
  favicon: string,
}

type GetResponse = {
  clients: Client[];
}

export async function getClients() {
  return axios.get<GetResponse>("/api/clients").then(res => res.data.clients)
}
