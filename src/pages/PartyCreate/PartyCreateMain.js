import { useState } from "react";
import PartyCreateList from "./PartyCreateList/PartyCreateList";
import { Routes, Route } from "react-router-dom";
import PartyCreatePage from "./PartyCreatePage/PartyCreatePage";

const PartyCreateMain = () => {
    const [selectServiceCategory,setSelectServiceCategory] = useState("전체");
    return (
        <Routes>
            <Route path="/" element={<PartyCreateList selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory}/>}></Route>
            <Route path="/partyCreate" element={<PartyCreatePage selectServiceCategory={selectServiceCategory}/>}></Route>
        </Routes>
    );
}

export default PartyCreateMain;