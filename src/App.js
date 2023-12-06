import "./App.css";

//컴포넌트 요소
import GrayRectangleBtn from "./components/GrayRectangleBtn/GrayRectangleBtn";
import PurpleRoundBtn from "./components/PurpleRoundBtn/PurpleRoundBtn";
import PurpleRectangleBtn from "./components/PurpleRectangleBtn/PurpleRectangleBtn";
import WhiteRectangleBtn from "./components/WhiteRectangleBtn/WhiteRectangleBtn";
import WhiteRoundBtn from "./components/WhiteRoundBtn/WhiteRoundBtn";
import Header from "./components/Header/Header";

import { createContext, useState } from "react";
import Footer from "./components/Footer/Footer";

export const MenuContext = createContext();

function App() {
  const [selectedMenu, setSelectedMenu] = useState("");
  return (
    <MenuContext.Provider value={{ setSelectedMenu }}>
      <>
        <Header></Header>
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
        <Footer></Footer>
      </>
    </MenuContext.Provider>
  );
}

export default App;
