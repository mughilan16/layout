"use client"
import { Box } from "@mui/material";
import NavBar from "./components/Navbar";
import SideBar, { SIDEBAR_WIDTH } from "./components/Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";
import type { Session } from "inspector";
import { SessionProvider } from "next-auth/react";
import useStore from "./store/useStore";

const queryClient = new QueryClient();

export default function Providers({ session, children }: { session: Session | null, children: React.ReactNode }) {
    const sidebarOpen = useStore(state => state.sidebarOpen);
    return <Box>
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Box sx={{ backgroundColor: "#fefefe", height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }} >
                    <NavBar />
                    <Box sx={{ display: "flex", flexDirection: "column", height: "full", flexGrow: 1 }}>
                        <SideBar />
                        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
                            <Box sx={{ width: sidebarOpen ? `calc(100vw - ${SIDEBAR_WIDTH})` : "100vw", textWrap: "wrap", overflowY: "scroll", height: "calc(100vh - 60px)", color: "#333" }}>
                                {children}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </QueryClientProvider>
        </SessionProvider>
    </Box>
}

