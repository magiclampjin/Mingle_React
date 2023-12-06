import logo from "./logo.svg";
import "./App.css";
import GrayRectangleBtn from "./components/GrayRectangleBtn/GrayRectangleBtn";
import PurpleRoundBtn from "./components/PurpleRoundBtn/PurpleRoundBtn";
import PurpleRectangleBtn from "./components/PurpleRectangleBtn/PurpleRectangleBtn";
import WhiteRectangleBtn from "./components/WhiteRectangleBtn/WhiteRectangleBtn";
import WhiteRoundBtn from "./components/WhiteRoundBtn/WhiteRoundBtn";

function App() {
  return (
    <>
      <GrayRectangleBtn
        title={"gray"}
        width={120}
        heightPadding={20}
      ></GrayRectangleBtn>
      <PurpleRoundBtn title={"test"} activation={true}></PurpleRoundBtn>
      <PurpleRoundBtn title={"test"} activation={false}></PurpleRoundBtn>
      <PurpleRectangleBtn
        title={"test"}
        width={150}
        heightPadding={10}
      ></PurpleRectangleBtn>
      <WhiteRectangleBtn title={"wersdfgfrec"}></WhiteRectangleBtn>
      <WhiteRoundBtn title={"white"}></WhiteRoundBtn>
    </>
  );
}

export default App;
