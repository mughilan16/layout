"use client"
import { useUser } from "@/queries/useUser";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  if (isLoading) return <>Loading</>;
  return (
    <main>
      {user === undefined &&
        <Button onClick={() => router.push("/login")}></Button>
      }
      {user !== undefined && <Box>
        <Button onClick={() => router.push("/private")}>
          Go to Private route
        </Button>
      </Box>}
    </main>
  );
}
