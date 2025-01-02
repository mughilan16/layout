"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const { status } = useSession();
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);
    return <>{children}</>
}
