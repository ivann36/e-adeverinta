import { create } from "zustand";

type LoginStore = {
  isLoggedIn: boolean;
  logOut: Function;
  logIn: Function;
};

export const useLoginStore = create<LoginStore>((set) => ({
  isLoggedIn: false,
  logOut: () =>
    set({
      isLoggedIn: false,
    }),
  logIn: () =>
    set({
      isLoggedIn: true,
    }),
}));
