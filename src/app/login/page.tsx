"use client"
import { Box, Button, Input } from "@mui/material";
import { useState } from "react";
import useStore from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  console.log(username, password);

  const signIn = useStore(state => state.signIn);

  const login = () => {
    if (username !== "" && password !== "") {
      signIn(username, password)
      router.push("/");
    };
  }

  return <Box sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%"
  }}>
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "300px",
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}>
        <label>User Name</label>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            fontSize: "18px",
          }} />
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}>
        <label>Password</label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            fontSize: "18px"
          }} />
      </Box>
      <Button
        variant="contained"
        onClick={login}
      >LOGIN</Button>
    </Box>
  </Box>
}
