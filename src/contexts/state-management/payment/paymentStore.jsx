import create from "zustand";

export const PaymentStore = create((set) => ({
    paymentData: [],
    setPaymentData: (data) => set({paymentData: data}),
    isEdit: false,
    setIsEdit: (data) => set({isEdit: data}),
}))