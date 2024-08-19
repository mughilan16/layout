"use client"
import { Box } from "@mui/material";
import { useUser } from "@/queries/useUser";

export default function Private() {
  const { data: user, isLoading } = useUser();
  if (isLoading) return <>Loading</>
  if (user === undefined) return <></>
  return (
    <Box>
      Logged In as : {user.user.user_name}
    </Box>
  );
}
