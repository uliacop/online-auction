export const initialState = {
  lots: [],
  index: 0,
  status: "loading",
  selectedBid: null,
  winningBid: null,
  rate: 0,
  description: null,
  currentTurn: "you",
  secondsRemaining: 200,
  users: [
    { id: "you", bid: 0 },
    { id: 1, bid: 0 },
    { id: 2, bid: 0 },
  ],
  winner: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, lots: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: 100,
      };
    case "handleBid":
      return { ...state, selectedBid: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };

    case "nextLot":
      return {
        ...state,
        index: state.index + 1,
        rate: 0,
        winner: null,
        secondsRemaining: 150,
        status: "active",
        users: state.users.map((user) => ({ ...user, bid: 0 })),
      };
    case "finished":
      return { ...state, status: "finished", winningBid: state.selectedBid };
    case "restart":
      return { ...initialState, lots: state.lots, status: "ready" };
    case "userBid": {
      const newBid = state.rate + 500;

      return {
        ...state,
        rate: newBid,
        users: state.users.map((user) =>
          user.id === "you" ? { ...user, bid: newBid } : user
        ),
        currentTurn: 1,
      };
    }
    case "tick": {
      const newTime = state.secondsRemaining - 1;
      if (newTime < 0) {
        const allParticipants = state.users;

        const winnerMember = allParticipants.reduce((maxUser, currentUser) => {
          return currentUser.bid > maxUser.bid ? currentUser : maxUser;
        });
        return {
          ...state,
          winner: winnerMember,
          secondsRemaining: 0,
          status: "finished",
        };
      }
      return {
        ...state,
        secondsRemaining: newTime,
      };
    }
    case "newRate": {
      const newRate = action.payload;
      return { ...state, rate: newRate > state.rate ? newRate : state.rate };
    }
    case "botBid": {
      if (state.currentTurn !== action.payload.id) return state;

      const decision = getBotDecision(state.rate);

      if (decision.type === "skip") {
        return {
          ...state,
          currentTurn: action.payload.id === 1 ? 2 : "you",
        };
      }
      const newBid = state.rate + decision.amount;
      return {
        ...state,
        rate: newBid,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, bid: newBid } : user
        ),
        currentTurn: action.payload.id === 1 ? 2 : "you",
      };
    }
    default:
      throw new Error("Action unknown");
  }
}
function getRandomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getBotDecision(rate) {
  const random = Math.random();

  if (random < 0.2) {
    return { type: "skip" };
  }
  const base = Math.max(100, Math.floor(rate * 0.1));

  return {
    type: "bid",
    amount: getRandomAmount(base, base * 3),
  };
}
