import React from "react";
import { useAuction } from "../../contexts/AuctionContext";
export default function Progress() {
  const { index, numLots, lot } = useAuction();
  return (
    <header>
      <progress max={numLots} value={index + Number(lot !== null)} />
      <p className="progress-lot">
        Lot&nbsp; <strong>{index + 1}</strong>/{numLots}
      </p>
    </header>
  );
}
