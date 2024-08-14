"use client"
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import useStore from "@/store/useStore";
import { useUser } from "@/queries/useUser";

export default function NavBar() {
  const toggleSidebar = useStore(state => state.toggleSidebar);
  const { data: user } = useUser();
  return (
    <Box>
      <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "60px" }}>
        <Toolbar>
          {user !== undefined && <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleSidebar()}
          >
            <MenuIcon />
          </IconButton>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          {user !== undefined &&
            <Box>
              <Typography>
                {user.user.user_name}
              </Typography>
            </Box>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

