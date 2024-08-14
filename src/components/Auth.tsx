"use client"
import { useUser } from "@/queries/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user === undefined && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading, router]);
  if (isLoading) return <></>
  return <>{children}</>
}
