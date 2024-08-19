import { getClients } from "@/api/clients";
import { useQuery } from "react-query";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
  })
}

