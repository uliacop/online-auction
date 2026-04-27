import { Hourglass } from "react-loader-spinner";
export default function Loader() {
  return (
    <>
      <Hourglass
        visible={true}
        height="180"
        width="180"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
      <p>Loading... Just a moment</p>
    </>
  );
}
