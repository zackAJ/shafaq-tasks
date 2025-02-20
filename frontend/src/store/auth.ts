import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = { token: string | null }
type Action = {
  setToken: (state: string) => void,
  clear: () => void,
  isAuthenticated: () => boolean,
}

export type AuthStore = State & Action

export const useAuthStore = create<AuthStore>()(

  persist(
    (set, get) => ({
      token: null,
      setToken: (token: string) => set({ token: token }),
      clear: () => set({ token: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'token',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
