import { useAuction } from "../../contexts/AuctionContext";
import { CiGift } from "react-icons/ci";
import { FaGifts } from "react-icons/fa";
import Confetti from "react-confetti-boom";
export default function Winner() {
  const { winner } = useAuction();
  if (!winner || winner.bid === 0)
    return <p>The lot has been withdrawn from auction</p>;
  return (
    <div className="winner-message">
      {winner.id === "you" ? (
        <>
          <p className="winner-text">
            You win! Our congratulations!
            <CiGift />
          </p>
          <Confetti />
        </>
      ) : (
        <p className="winner-text">
          User {winner.id} wins! Our congratulations!
          <FaGifts />
        </p>
      )}
    </div>
  );
}
