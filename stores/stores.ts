import { create } from 'zustand';

type State = {
  username: string;
};

type Action = {
  updateUsername: (username: State['username']) => void;
};

export const useUsernameStore = create<State & Action>((set) => ({
  username: '',
  updateUsername: (username) => set(() => ({ username: username })),
}));
