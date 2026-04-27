import { Children } from "react";
import { createContext, useContext } from "react";

export const AuctionContext = createContext();
export function useAuction() {
  const context = useContext(AuctionContext);
  if (context === undefined)
    throw new Error("AuctionContext was used outside of the AuctionProvider");
  return context;
}
