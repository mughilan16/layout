"use client"
import { Box, Divider } from "@mui/material";
import { useUser } from "@/queries/useUser";
import { useRouter } from "next/navigation";

export default function Private() {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <>Loading</>
  console.log(user)
  if (user === undefined) return router.push("/login")
  return (
    <Box>
      Logged In as : {user.user.user_name}
    </Box>
  );
}

function NotFound() {
  return <Box sx={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
    <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
      <Box sx={{ fontSize: "20px", fontWeight: "400" }}>404</Box>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ height: "24px" }} />
      <Box>This page could not be found.</Box>
    </Box>
  </Box>
}
