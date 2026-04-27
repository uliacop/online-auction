import React from "react";
import { useAuction } from "../../contexts/AuctionContext";
import { MdOutlinePerson2 } from "react-icons/md";
export default function Members() {
  const { users, dispatch } = useAuction();
  return (
    <div className="members">
      <h3>Participants</h3>

      {users.map((user) => (
        <div className="group" key={user.id}>
          <span className="member">
            <MdOutlinePerson2 />
          </span>
          <span className="user"> User {user.id}:&nbsp;</span>
          <button
            className="button-user"
            onClick={() => dispatch({ type: "userBid" })}
          >
            {user.bid}
          </button>
        </div>
      ))}
    </div>
  );
}
