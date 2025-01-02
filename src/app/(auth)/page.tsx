"use client"
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { status } = useSession();
    if (status === "unauthenticated") {
        router.push("/login");
    }
    return (
        <main>
            {status === "authenticated" && <Box sx={{display: "flex", flexDirection: "column"}}>
                <Link href="/private">
                    Go to Private route
                </Link>
                <Link href="/files">
                    File Tree V1
                </Link>
                <Link href="/files2">
                    File Tree V2
                </Link>
                <Link href="/pre-edit">
                    Pre Edit
                </Link>
            </Box>}
        </main>
    );
}
