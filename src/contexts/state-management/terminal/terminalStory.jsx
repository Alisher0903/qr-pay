import create from "zustand";

export const TerminalStory = create((set) => ({
    terminalData: [],
    setTerminalData: (data) => set({terminalData: data}),
    isEdit: false,
    setIsEdit: (data) => set({isEdit: data}),
}))