import { useEffect } from "react";
import { useAuction } from "../../contexts/AuctionContext";
import { RiTimerLine } from "react-icons/ri";
export default function Timer() {
  const { dispatch, secondsRemaining, currentTurn } = useAuction();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
  useEffect(() => {
    if (currentTurn === "you") return;

    const delay = Math.random() * 2000 + 500;
    const timer = setTimeout(() => {
      dispatch({
        type: "botBid",
        payload: { id: currentTurn },
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [currentTurn, dispatch]);
  return (
    <div className="timer">
      <RiTimerLine />
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
