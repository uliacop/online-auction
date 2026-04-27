import React from "react";
import Members from "./Members";
import { useAuction } from "../../contexts/AuctionContext";
export default function Lot() {
  const { lot, dispatch, rate, users, winner, index, numLots } = useAuction();
  if (!lot) return null;
  return (
    <div>
      <img src={lot.image_url} alt={lot.title} />
      <div className="lot-description">
        <h4>{lot.title}</h4>
        <p>{lot.artist}</p>
        <p>{lot.description}</p>
        <p>Starting price:${lot.starting_price_usd}</p>
        {rate !== 0 && (
          <p>Current bid: ${rate + Number(lot.starting_price_usd)}</p>
        )}
        {index === numLots - 1 && <p>It`s a last lot in our auction</p>}
      </div>
      <Members
        lot={lot}
        dispatch={dispatch}
        rate={rate}
        users={users}
        winner={winner}
      />
    </div>
  );
}
