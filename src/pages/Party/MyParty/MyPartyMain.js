import { Routes, Route } from "react-router-dom";
import MyPartyList from "./MyPartyList/MyPartyList";

const PartyCreateMain = () => {
    return (
        <Routes>
            <Route path="/" element={<MyPartyList/>}></Route>
        </Routes>
    );
}

export default PartyCreateMain;