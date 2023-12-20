import { Routes, Route } from "react-router-dom";
import MyParty from "./MyParty/MyPartyMain";
import PartyJoin from "./PartyJoin/PartyJoinMain";
import PartyCreate from "./PartyCreate/PartyCreateMain";
import style from "./PartyMain.module.css";

const PartyMain = () => {
    return (
        <div className={style.margin}>
            <Routes>             
                <Route path="/partyCreate/*" element={<PartyCreate/>}></Route>
                <Route path="/myParty/*" element={<MyParty />}></Route>
                <Route path="/partyJoin/*" element={<PartyJoin />}></Route>
            </Routes>
        </div>
    );
}

export default PartyMain;