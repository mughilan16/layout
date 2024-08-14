import { login, getUser, User } from "@/api/user";
import { useMutation, useQuery, useQueryClient } from "react-query";

function setToken(userToken: string, userId: string) {
  sessionStorage.setItem('user-id', JSON.stringify(userId));
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const idString = sessionStorage.getItem('user-id');
  const userToken = JSON.parse(tokenString!);
  const userId = JSON.parse(idString!);
  console.log(userId)
  return { userToken: userToken, userId: userId };
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = getToken();
      if (!token.userId || !token.userToken) {
        console.log("not logged in");
        return undefined;
      }
      const user = getUser({ token: token.userToken, userId: token.userId });
      console.log(user);
      return user;
    },
  })
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess(res) {
      setToken(res.token, res.user.user_id.toString());
      queryClient.setQueriesData<User>("user", (_) => {
        console.log(res)
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
      setToken("", "");
      queryClient.setQueriesData<User | undefined>("user", (_) => {
        return undefined
      })
    },
  })
}
