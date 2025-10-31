import { createContext, type Dispatch, type SetStateAction } from "react";

export type paymentDetailsType = {
  experience_id: string;
  title: string;
  date: string;
  dateId: string;
  time: string;
  timeId: string;
  quantity: number;
  subtotal: number;
  tax: number;
  total: number;
};

export type AppContextType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  paymentDetails: null | paymentDetailsType;
  setPaymentDetails: Dispatch<SetStateAction<null | paymentDetailsType>>;
};

export const AppContext = createContext<AppContextType>({
  search: "",
  setSearch: () => {},
  paymentDetails: null,
  setPaymentDetails: () => {},
});
