import { create } from 'zustand'
import { User } from '@/types/models.ts'

export type State = { user: User | null }
export type Action = {
  setUser: (user: User) => void,
  clear: () => void,
}

export type UserStore = State & Action

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clear: () => set({ user: null })
}))
