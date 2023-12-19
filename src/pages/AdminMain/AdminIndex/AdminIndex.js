import style from "../AdminMain.module.css"
import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";

import MemberManageBox from '../components/MemberManageBox/MemberManageBox';
import NoticeBoardBox from '../components/NoticeBoardBox/NoticeBoardBox';
import StatisticsBox from "../components/StatisticsBox/StatisticsBox";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const AdminIndex = () => {

    const [authority, setAuthority] = useState();

    // 선택한 서비스 정보 불러오기 로딩
    const [isServiceLoading, setServiceLoading] = useState(false);
    
    useEffect(() => {
        setServiceLoading(true);
        
        axios.get("api/member/isAdmin").then(resp => {
            setAuthority(resp.data);
            setServiceLoading(false);
        }).catch(() => {
            setServiceLoading(false);
        })
    }, []);
    

    return (
        <>
            {isServiceLoading || authority===undefined ? (
                <LoadingSpinner />
            ) : (
                <>
                    {authority ? (
                        <div className={style.background}>
                            <div className={style.body}>
                                <MemberManageBox />
                                <NoticeBoardBox />
                                <StatisticsBox />
                            </div>
                        </div>
                    ) : (
                        <Navigate to="/denied" />
                    )}
                </>
            )}
        </>
        // isServiceLoading ? (
        //     <LoadingSpinner />
        // ) : (
        //     <>
        //     {console.log(authority)}
        //     authority ? (
        //         <div className={style.background}>
        //         <div className={style.body}>
        //             <MemberManageBox />
        //             <NoticeBoardBox />
        //             <StatisticsBox />
        //         </div>
        //         </div>
        //     ) : (
        //         <Navigate to="/denied" />
        //     )
        //     </>
        // )
    );
}

export default AdminIndex;