import { useState } from "react";
import { AppContext, type paymentDetailsType } from "./appContext";

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [paymentDetails, setPaymentDetails] =
    useState<paymentDetailsType | null>(null);
  return (
    <AppContext.Provider
      value={{ search, setSearch, paymentDetails, setPaymentDetails }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
