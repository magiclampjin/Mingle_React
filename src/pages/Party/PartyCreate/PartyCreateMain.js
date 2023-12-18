import PartyCreateList from "./PartyCreateList/PartyCreateList";
import PartyCreatePage from "./PartyCreatePage/PartyCreatePage";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

const PartyCreateMain = () => {
    const [selectServiceCategory,setSelectServiceCategory] = useState("전체");
    return (
        <Routes>
            <Route path="/" element={<PartyCreateList selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory}/>}></Route>
            <Route path="/partyCreatePage" element={<PartyCreatePage/>}></Route>
        </Routes>
    );
}

export default PartyCreateMain;