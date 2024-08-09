"use client"
import { Box, Button, Input } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutateAsync: login } = useLogin();

  const clickHandler = () => {
    if (email !== "" && password !== "") {
      login({ email, password });
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
        <label>Email</label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
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
        onClick={clickHandler}
      >LOGIN</Button>
    </Box>
  </Box>
}
