import { login, getUser, User } from "@/api/user";
import { useMutation, useQuery, useQueryClient } from "react-query";

function setToken(userToken: string) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString!);
  return userToken;
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = getToken();
      if (token === undefined) {
        return undefined;
      }
      return getUser();
    },
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
