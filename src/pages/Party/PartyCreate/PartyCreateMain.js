import PartyCreateList from "./PartyCreateList/PartyCreateList";
import PartyCreatePage from "./PartyCreatePage/PartyCreatePage";
import { createContext, useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { MenuContext } from "../../../App";

export const CreatePartyContext = createContext();

const PartyCreateMain = () => {
  const [selectServiceCategory, setSelectServiceCategory] = useState("전체");
  const [service, setService] = useState(null);
  const { setSelectedMenu } = useContext(MenuContext);
  useEffect(() => {
    setSelectedMenu("파티 만들기");
  }, []);
  return (
    <CreatePartyContext.Provider
      value={{
        service,
        setService,
      }}
    >
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
    </CreatePartyContext.Provider>
  );
};

export default PartyCreateMain;
