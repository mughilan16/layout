"use client"
import { useUser } from "@/queries/useUser";
import { useRouter } from "next/navigation";

export default function Auth({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <></>
  if (user === undefined) router.push("/login");
  return <>{children}</>
}
