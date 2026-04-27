import { useReducer, useEffect } from "react";
import { reducer, initialState } from "../reducers/auctionReducer";
import { AuctionContext } from "../contexts/AuctionContext";
export function AuctionProvider({ children }) {
  const [
    { lots, status, index, rate, users, currentTurn, secondsRemaining, winner },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numLots = lots.length;
  const lot = lots[index];
  useEffect(function () {
    fetch("http://localhost:9000/auction_lots")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <AuctionContext.Provider
      value={{
        lots,
        lot,
        status,
        index,
        rate,
        users,
        currentTurn,
        secondsRemaining,
        winner,
        numLots,
        dispatch,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
}
