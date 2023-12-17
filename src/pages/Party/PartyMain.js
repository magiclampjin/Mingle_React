import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MyParty from "../MyParty/MyPartyMain";
import PartyJoin from "../PartyJoin/PartyJoinMain";
import PartyCreate from "../PartyCreate/PartyCreateMain";

const PartyMain = () => {
    return (
        <Routes>
            <Route path="/partyCreate/*" element={<PartyCreate/>}></Route>
            <Route path="/myParty/*" element={<MyParty />}></Route>
            <Route path="/partyJoin/*" element={<PartyJoin />}></Route>
        </Routes>
    );
}

export default PartyMain;