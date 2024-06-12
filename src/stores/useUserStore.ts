import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user : {firstName : string, lastName : string, }) => set({ user }),
}));

export default useUserStore;