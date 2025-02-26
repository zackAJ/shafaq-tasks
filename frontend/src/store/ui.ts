import { create } from 'zustand'

export type State = { premiumPopup: boolean }
export type Action = {
  togglePremiumPopup: (val?: boolean) => void,
}

export type UiStore = State & Action

export const useUiStore = create<UiStore>((set, get) => ({
  premiumPopup: false,
  togglePremiumPopup: (val?: boolean) => {
    if (val === undefined) val = get().premiumPopup

    return set({ premiumPopup: val })
  },
}))
