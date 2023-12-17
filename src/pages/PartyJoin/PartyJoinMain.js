import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PartyJoinList from "./PartyJoinList/PartyJoinList";

const PartyCreateMain = () => {
    const [selectServiceCategory,setSelectServiceCategory] = useState("전체");
    return (
        <Routes>
            <Route path="/" element={<PartyJoinList selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory}/>}></Route>
        </Routes>
    );
}

export default PartyCreateMain;