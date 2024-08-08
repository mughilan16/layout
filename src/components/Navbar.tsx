"use client"
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import useStore from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const toggleSidebar = useStore(state => state.toggleSidebar);
  const router = useRouter();
  const { isSignedIn, username } = useStore();
  return (
    <Box>
      <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "60px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleSidebar()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {!isSignedIn &&
            <Button
              color="inherit" onClick={() => router.push("/login")}
            >
              Login
            </Button>
          }
          {isSignedIn &&
            <Box>
              {username}
            </Box>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

