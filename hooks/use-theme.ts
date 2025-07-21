import { createMemoryStore } from "@/utils";

type Theme = "light" | "dark" | "system";

type State = {
  theme: Theme;
};

type Actions = {
  setTheme: (theme: State["theme"]) => void;
};

const initialState: State = {
  theme: "dark",
};

// NOTE: mmkv doesn't support in Expo Go. Use createMemoryStore temporary to avoid crash in Expo Go.
// FIXME: using createPersistedStore instead in production.
const useTheme = createMemoryStore<State & Actions>((set) => ({
  ...initialState,
  setTheme: (theme) => set({ theme }),
}));

export { useTheme };
