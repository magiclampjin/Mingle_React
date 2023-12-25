import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../../App";
import MyPartyList from "./MyPartyList/MyPartyList";

const PartyCreateMain = () => {
  const { setSelectedMenu } = useContext(MenuContext);
  useEffect(() => {
    setSelectedMenu("나의 파티");
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MyPartyList />}></Route>
    </Routes>
  );
};

export default PartyCreateMain;
