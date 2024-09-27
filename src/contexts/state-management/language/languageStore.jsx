import create from "zustand";

export const LanguageStore = create((set) => ({
    languageData: localStorage.getItem("selectedLang") | "uz",
    setLanguageData: (data) => set({languageData: data}),
   
}))