import { login, getUser, User } from "@/api/user";
import { setToken } from "@/util/token";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  })
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess(res) {
      setToken(res.token);
      queryClient.setQueriesData<User>("user", (_) => {
        return res;
      })
    },
  })
}

export function useLogOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => undefined,
    onSuccess(_) {
      setToken("");
      queryClient.setQueriesData<User | undefined>("user", (_) => {
        return undefined
      })
    },
  })
}
