"use client"
import { useQuery } from "react-query";
import { Menu, getMenus } from "@/api/menus";
import { Box, Divider, Drawer, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Abc, AccountCircle, AudioFile, BackupTable, Balcony, BrowseGallery, Cameraswitch, CurrencyRuble, Description, Elevator, EventSeat, Explicit, Extension, FiberSmartRecord, FileOpen, Folder, FormatUnderlined, Forum, Grade, Grid4x4, Home, Memory, NotificationAdd, Settings, SettingsSuggest, SupervisedUserCircle, ViewQuilt, Widgets } from "@mui/icons-material";
import { useState } from "react";
import useStore from "@/store/useStore";
import { useUser } from "@/queries/useUser";
import { useRouter } from "next/navigation";

export const SIDEBAR_WIDTH = "350px";

const IconMap = new Map([
  ["Home", <Home />],
  ["Abc", <Abc />],
  ["Description", <Description />],
  ["Grid4x4", <Grid4x4 />],
  ["Settings", <Settings />],
  ["AccountCircle", <AccountCircle />],
  ["CurrencyRuble", <CurrencyRuble />],
  ["SettingsSuggest", <SettingsSuggest />],
  ["Grade", <Grade />],
  ["Memory", <Memory />],
  ["BackupTable", <BackupTable />],
  ["AudioFile", <AudioFile />],
  ["FileOpen", <FileOpen />],
  ["Elevator", <Elevator />],
  ["Forum", <Forum />],
  ["Explicit", <Explicit />],
  ["FiberSmartRecord", <FiberSmartRecord />],
  ["Cameraswitch", <Cameraswitch />],
  ["Balcony", <Balcony />],
  ["ViewQuilt", <ViewQuilt />],
  ["BrowseGallery", <BrowseGallery />],
  ["Extension", <Extension />],
  ["Widgets", <Widgets />],
  ["Folder", <Folder />],
  ["FormatUnderlined", <FormatUnderlined />],
  ["NotificationAdd", <NotificationAdd />],
  ["SupervisedUserCircle", <SupervisedUserCircle />],
  ["EventSeat", <EventSeat />],
])

const getIcon = (key: string) => {
  const value = IconMap.get(key);
  if (value === undefined) {
    return <Home />;
  }
  return value;
}
function buildTree(menus: Menu[]) {
  const menuMap = new Map();
  const tree: Menu[] = [];

  menus.forEach(menu => {
    menuMap.set(menu.id, { ...menu, sub_tree: [] });
  });

  menus.forEach(menu => {
    if (menu.parent_id !== "0") {
      const parent = menuMap.get(parseInt(menu.parent_id, 10));
      if (parent) {
        parent.sub_tree.push(menuMap.get(menu.id));
      }
    } else {
      tree.push(menuMap.get(menu.id));
    }
  });

  return tree;
}

export default function SideBarWrapper() {
  const user = useUser();
  if (user === undefined) return <></>
  return <SideBar />
}
export function SideBar() {
  const [link, setLink] = useState("/");
  const useGetMenus = () => useQuery({
    queryKey: ["menus"],
    queryFn: getMenus,
  });
  const open = useStore(state => state.sidebarOpen);
  const { data, isLoading } = useGetMenus();
  if (isLoading) return <>Loading..</>
  if (data === undefined) return <>Loading</>
  const menus = buildTree(data);
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: SIDEBAR_WIDTH, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.5rem" }}>
          {menus.map(menu => <Item menu={menu} key={menu.id} setLink={(link: string) => setLink(link)} />)}
        </Box>
        <Divider />
      </Box>
    </Drawer>
  )
}


function Item(props: { menu: Menu, setLink: (link: string) => void }) {
  const router = useRouter();
  return (
    <Box
      onClick={() => router.push("/" + props.menu.menu_name.toLowerCase())}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: props.menu.sub_tree?.length === 0 ? "#00000000" : "#aaaaaa22",
        margin: props.menu.sub_tree?.length === 0 ? "0" : "0.2rem",
        borderRadius: "5px"
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          {getIcon(props.menu.icon)}
        </ListItemIcon>
        <ListItemText primary={props.menu.menu_name} />
      </ListItemButton>
      {props.menu.sub_tree !== null && props.menu.sub_tree.length !== 0 &&
        <Box
          sx={{
            paddingLeft: "0.5rem",
            paddingRight: "1rem",
            marginLeft: "0.5rem",
            paddingY: "1rem"
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: props.menu.sub_tree?.length === 0 ? "#00000000" : "#55555522",
              borderRadius: "5px",
              flexDirection: "column",
            }}
          >
            {props.menu.sub_tree.map(menu => <Item
              key={menu.menu_id}
              menu={menu}
              setLink={props.setLink}
            />)}
          </Box>
        </Box>
      }
    </Box>
  )
}

