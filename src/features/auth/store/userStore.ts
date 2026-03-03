import { create } from 'zustand';

interface UserState {
  userName: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  setIsAuthenticated: (auth: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: null,
  userEmail: null,
  isAuthenticated: false,

  setUserName: (name) =>
    set({
      userName: name,
    }),

  setUserEmail: (email) =>
    set({
      userEmail: email,
    }),

  setIsAuthenticated: (auth) =>
    set({
      isAuthenticated: auth,
    }),

  clearUser: () =>
    set({
      userName: null,
      userEmail: null,
      isAuthenticated: false,
    }),
}));
