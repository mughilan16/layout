import { create } from "zustand";

type State = {
  isSignedIn: boolean;
  username: string;
  password: string;
  sidebarOpen: boolean;
}

type Action = {
  toggleSidebar: () => void;
  signIn: (username: string, password: string) => void;
}

const useStore = create<State & Action>(set => ({
  sidebarOpen: false,
  username: "",
  password: "",
  isSignedIn: false,
  signIn(username, password) {
    set(prev => ({
      ...prev,
      isSignedIn: true,
      username: username,
      password: password
    }))
  },
  toggleSidebar() {
    set(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))
  },
}))

export default useStore;
