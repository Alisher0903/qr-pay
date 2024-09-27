import create from "zustand";

export const LanguageStore = create((set) => ({
    languageData: sessionStorage.getItem("selectedLang") | "uz",
    setLanguageData: (data) => set({languageData: data}),
   
}))