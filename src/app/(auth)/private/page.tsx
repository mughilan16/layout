"use client"
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Private() {
  const { data: session } = useSession();
  if (session?.user === undefined) return <></>
  return (
    <Box>
      Logged In as : {session.user.name}
    </Box>
  );
}
