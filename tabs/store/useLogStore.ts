import { create } from "zustand"

export const useLogStore = create<Domain>((set) => ({
  apiLogList: [],
  clearLogList: () => set({ apiLogList: [] }),
  addApiLogList: (apiLog) => {
    set({ apiLogList: [apiLog, ...useLogStore.getState().apiLogList] })
  }
}))
