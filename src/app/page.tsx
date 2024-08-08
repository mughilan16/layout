"use client"
import useStore from "@/store/useStore";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const isSignedIn = useStore(state => state.isSignedIn)
  const router = useRouter();
  return (
    <main>
      {isSignedIn && <Box>
        <Button onClick={() => router.push("/private")}>
          Go to Private route
        </Button>
      </Box>}
    </main>
  );
}
