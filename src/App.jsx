import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import StartPage from "./components/StartPage";
import Loader from "./components/Loader";
import Lot from "./components/Lot";
import Timer from "./components/Timer";
import Progress from "./components/Progress";
import Footer from "./components/Footer";
import NextButton from "./components/NextButton";
import Winner from "./components/Winner";
import { useAuction } from "../contexts/AuctionContext";
function App() {
  const { status } = useAuction();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartPage />}
        {status === "active" && (
          <>
            <Progress />
            <Lot />
            <Timer />
          </>
        )}
        {status == "finished" && (
          <Footer>
            <Winner />
            <NextButton />
          </Footer>
        )}
      </Main>
    </div>
  );
}

export default App;
