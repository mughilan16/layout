"use client"
import { Box, Button, Input } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/useUser";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
    const { data: session, status } = useSession();
    console.log(session, status);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const clickHandler = () => {
        setIsLoginLoading(true);
        if (email !== "" && password !== "") {
            signIn("credentials", {
                email: email,
                password: password
            }).then(() => {
                router.push("/");
            }).finally(() => {
                setIsLoginLoading(false);
            })
        };
    }

    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%"
    }}>
        {status === "unauthenticated" &&
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
                        disabled={isLoginLoading}
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
                        disabled={isLoginLoading}
                        sx={{
                            fontSize: "18px"
                        }} />
                </Box>
                <Button
                    variant="contained"
                    onClick={clickHandler}
                    disabled={isLoginLoading}
                >
                    {isLoginLoading ? "LOADING" : "LOGIN"}
                </Button>
            </Box>
        }
        {status === "authenticated" &&
            <Box>
                You are logged in as {session?.user?.name}
            </Box>
        }
    </Box>
}
