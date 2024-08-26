import create from "zustand";

export const NotificationStore = create((set) => ({
    notificationData: [],
    setNotificationData: (data) => set({notificationData: data}),
    countData: [],
    setCountData: (data) => set({countData: data}),
    loading: false,
    setLoading: (data) => set({loading: data})
}))