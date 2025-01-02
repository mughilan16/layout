"use client"
import { useUser } from "@/queries/useUser";
import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { status } = useSession();
    if (status === "unauthenticated") {
        router.push("/login");
    }
    return (
        <main>
            {status === "authenticated" && <Box>
                <Button onClick={() => router.push("/private")}>
                    Go to Private route
                </Button>
            </Box>}
        </main>
    );
}
