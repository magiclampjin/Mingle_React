import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PartyAllList from "./PartyAllList/PartyAllList";
import PartyList from "./PartyList/PartyList";
import PartyAttend from "./PartyAttend/PartyAttend";

const PartyCreateMain = () => {
    const [selectServiceCategory,setSelectServiceCategory] = useState("전체");
    return (
        <Routes>
            <Route path="/" element={<PartyAllList selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory}/>}></Route>
            <Route path="/PartyList" element={<PartyList/> }></Route>
            <Route path="/PartyAttend" element={<PartyAttend/> }></Route>
        </Routes>
    );
}

export default PartyCreateMain;