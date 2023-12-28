import style from "../AdminMain.module.css"
import { useEffect, useState, useContext } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";

import MemberManageBox from '../components/MemberManageBox/MemberManageBox';
import NoticeBoardBox from '../components/NoticeBoardBox/NoticeBoardBox';
import StatisticsBox from "../components/StatisticsBox/StatisticsBox";
import { LoginContext } from "../../../App";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const AdminIndex = () => {

    const [authority, setAuthority] = useState(); // 관리자 권한 여부
    const { loginId, setLoginId } = useContext(LoginContext); // 로그인 여부

    // 선택한 서비스 정보 불러오기 로딩
    const [isServiceLoading, setServiceLoading] = useState(false);
    
    useEffect(() => {
        setServiceLoading(true);
        
        axios.get("api/member/isAdmin").then(resp => {
            setAuthority(resp.data);
            setServiceLoading(false);
        }).catch(() => {
            setAuthority(false); // 로그인하지 않은 사용자가 접근했을 때 false로 돌려보냄
            setServiceLoading(false);
        })
    }, [loginId]);
    

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
    );
}

export default AdminIndex;