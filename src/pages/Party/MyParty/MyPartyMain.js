import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../../App";
import MyPartyList from "./MyPartyList/MyPartyList";
import MyPartyInfo from "./MyPartyInfo/MyPartyInfo";
import { createContext, useState } from "react";

export const myPartyContext = createContext();
const MyPartyMain = () => {
    const [selectParty, setSelectParty] = useState();
  
    return (
        <myPartyContext.Provider
            value={{
                selectParty:selectParty, 
                setSelectParty:setSelectParty
            }}
        >
            <Routes>
                <Route path="/" element={<MyPartyList/>}/>
                <Route path="/myPartyInfo" element={<MyPartyInfo/>}/>
            </Routes>
        </myPartyContext.Provider>
    );
}

export default MyPartyMain;