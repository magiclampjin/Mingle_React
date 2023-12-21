import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import PartyAllList from "./PartyAllList/PartyAllList";
import PartyList from "./PartyList/PartyList";
import PartyAttend from "./PartyAttend/PartyAttend";

export const JoinPartyContext = createContext();

const PartyCreateMain = () => {
    const [selectServiceCategory,setSelectServiceCategory] = useState("전체");
    const [selectParty, setSelectParty] = useState(null);
    const [service, setService] = useState(null);
    return (
        <JoinPartyContext.Provider
            value={{
                selectParty,
                setSelectParty,
                service,
                setService
            }}
        >
            <Routes>
                <Route path="/" element={<PartyAllList selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory}/>}></Route>
                <Route path="/PartyList" element={<PartyList/> }></Route>
                <Route path="/PartyAttend" element={<PartyAttend/> }></Route>
            </Routes>
        </JoinPartyContext.Provider>
    );
}

export default PartyCreateMain;