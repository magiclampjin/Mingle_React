import { useState } from "react";
import PartyCreateList from "./PartyCreateList/PartyCreateList";
import { Routes, Route } from "react-router-dom";

const PartyCreateMain = () => {
    const [selectServiceCategory,setSelectServiceCategory] = useState("전체");
    return (
        <Routes>
            <Route path="/" element={<PartyCreateList selectServiceCategory={selectServiceCategory} setSelectServiceCategory={setSelectServiceCategory}/>}></Route>
        </Routes>
    );
}

export default PartyCreateMain;