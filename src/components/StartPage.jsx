import React from "react";
import { useAuction } from "../../contexts/AuctionContext";
export default function StartPage() {
  const { numLots, dispatch } = useAuction();
  return (
    <div className="start-page star-p">
      <h2>Welcome to the Auction-online!</h2>
      <h3>{numLots} lots to your attention</h3>
      <button className="button" onClick={() => dispatch({ type: "start" })}>
        Let`s start
      </button>
    </div>
  );
}
