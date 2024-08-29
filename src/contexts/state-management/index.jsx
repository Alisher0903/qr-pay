import create from "zustand";

export const AppStore = create((set) => ({
    getMeeData: [],
    setGetMeeData: (data) => set({getMeeData: data}),
}))