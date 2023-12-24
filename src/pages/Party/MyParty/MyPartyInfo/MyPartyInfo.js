import { useContext, useEffect, useState } from "react";
import style from "./MyPartyInfo.css";
import { myPartyContext } from "../MyPartyMain";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPartyInfo = () =>{
    const {selectParty} = useContext(myPartyContext);
    const [partyInfo, setPartyInfo] = useState();
    const navi = useNavigate();

    useEffect(()=>{
        axios.get(`/api/party/getPartyInfo/${selectParty}`).then(resp=>{
            console.log(resp.data);
            setPartyInfo(resp.data);
        }).catch(()=>{
            alert("정보를 불러오지 못 했습니다. 같은 문제가 반복되면 관리자에게 문의하세요.");
            navi(-1);
        })
    },[selectParty]);
    return(
        <>
            <div className={style.header}>
                
            </div>
        </>
    );
};

export default MyPartyInfo;