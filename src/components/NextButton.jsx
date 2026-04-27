import React from "react";
import { useAuction } from "../../contexts/AuctionContext";
export default function NextButton() {
  const { dispatch, index, numLots } = useAuction();

  if (index < numLots - 1) {
    return (
      <button
        className="button btn"
        onClick={() => dispatch({ type: "nextLot" })}
      >
        Next lot
      </button>
    );
  }

  if (index === numLots - 1)
    return (
      <button
        className="button btn"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart auction
      </button>
    );
}
