import PartyCreateList from "./PartyCreateList/PartyCreateList";
import PartyCreatePage from "./PartyCreatePage/PartyCreatePage";
import { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { MenuContext } from "../../../App";

const PartyCreateMain = () => {
  const [selectServiceCategory, setSelectServiceCategory] = useState("전체");
  const { setSelectedMenu } = useContext(MenuContext);
  useEffect(() => {
    setSelectedMenu("파티 만들기");
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PartyCreateList
            selectServiceCategory={selectServiceCategory}
            setSelectServiceCategory={setSelectServiceCategory}
          />
        }
      ></Route>
      <Route path="/partyCreatePage" element={<PartyCreatePage />}></Route>
    </Routes>
  );
};

export default PartyCreateMain;
