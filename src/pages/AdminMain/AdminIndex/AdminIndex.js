import style from "../AdminMain.module.css"
import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";

import MemberManageBox from '../components/MemberManageBox/MemberManageBox';
import NoticeBoardBox from '../components/NoticeBoardBox/NoticeBoardBox';
import StatisticsBox from "../components/StatisticsBox/StatisticsBox";

const AdminIndex = () => {

    const [authority, setAuthority] = useState();
    
    useEffect(() => {
        axios.get("api/member/isAdmin").then(resp => {
            setAuthority(resp.data);
        })
    }, []);

    if(!authority) {
        return <Navigate to="/denied" />
    }

    return (
        <div className={style.background}>
            <div className={style.body}>
                <MemberManageBox></MemberManageBox>
                <NoticeBoardBox></NoticeBoardBox>
                <StatisticsBox></StatisticsBox>
            </div>
        </div>
    );
}

export default AdminIndex;