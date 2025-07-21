import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { StateCreator } from "zustand/vanilla";

type StoreConfig = {
  name?: string;
  skipPersist?: boolean;
  mmkvInstance?: MMKV;
};

// NOTE: mmkv doesn't supported in Expo Go. Move default mmkv instance to inside function to avoid crash in Expo Go.
const createMMKVStorage = (mmkvInstance?: MMKV) => {
  const defaultStorage = new MMKV({
    id: "app-storage",
  });

  const mmkv = mmkvInstance || defaultStorage;

  const storage = {
    getItem: async (name: string): Promise<string | null> => {
      try {
        const value = mmkv.getString(name);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.warn(`Failed to get item "${name}" from storage:`, error);
        return null;
      }
    },

    setItem: async (name: string, value: string): Promise<void> => {
      try {
        if (!value || value === "undefined") {
          mmkv.delete(name);
          return;
        }
        mmkv.set(name, JSON.stringify(value));
      } catch (error) {
        console.warn(`Failed to set item "${name}" in storage:`, error);
      }
    },

    removeItem: async (name: string): Promise<void> => {
      try {
        mmkv.delete(name);
      } catch (error) {
        console.warn(`Failed to remove item "${name}" from storage:`, error);
      }
    },
  };

  return storage;
};

const createStore = <T>(
  storeCreator: StateCreator<T, [["zustand/immer", never]], []>,
  config: StoreConfig = {}
) => {
  const {
    name = "zustand-storage",
    skipPersist = false,
    mmkvInstance,
  } = config;

  const immerStore = immer(storeCreator);

  if (skipPersist) {
    return create<T>()(immerStore);
  }

  return create<T>()(
    persist(immerStore, {
      name,
      storage: createJSONStorage(() => createMMKVStorage(mmkvInstance)),
      version: 1,
    })
  );
};

const createPersistedStore = <T extends Record<string, unknown>>(
  storeCreator: StateCreator<T, [["zustand/immer", never]], []>,
  name: string
) => createStore(storeCreator, { name, skipPersist: false });

const createMemoryStore = <T extends Record<string, unknown>>(
  storeCreator: StateCreator<T, [["zustand/immer", never]], []>
) => createStore(storeCreator, { skipPersist: true });

export { createMemoryStore, createPersistedStore, createStore };
