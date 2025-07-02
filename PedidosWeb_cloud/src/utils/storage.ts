// src/utils/storage.ts

export const Storage = {
  getItem: async (key: string): Promise<string | null> => {
    return Promise.resolve(localStorage.getItem(key));
  },

  setItem: async (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },

  removeItem: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
    return Promise.resolve();
  }
};
