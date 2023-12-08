import style from "./MemberManageBox.module.css"
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import btnStyle from '../../../Main/Main.module.css'
import PurpleRoundBtn from '../../../../components/PurpleRoundBtn/PurpleRoundBtn';

const MemberManageBox = () => {

    const [report, setReport] = useState([{}]);

    useEffect(() => {
        axios.get("/api/admin/reportList").then(resp => {
            console.log(resp.data);
            setReport(resp.data);
        });
    }, []);

    return (
        <div className={style.body}>
            <div className={style.memberManageTitle}>신고된 회원 / 불량 회원 박스</div>
            <div className={style.memberManageBox}>
                <div className={style.memberManageSeeMore}>
                    <div></div>
                    <div className={style.memberManageSeeMoreBtn}>
                    <Link to="DetailMemberManage">
                        <PurpleRoundBtn title={"More"} activation={true}></PurpleRoundBtn>
                    </Link>
                    </div>
                </div>
                {report.map((e, i) => {
                    return(
                        <div className={style.memberManageLine}>
                            <div className={style.memberManageItem}>{e.id}</div>
                            <div className={style.memberManageItem}>{e.memberReporterId}</div>
                            <div className={style.memberManageItem}>{e.content}</div>
                            <div className={style.memberManageItem}>{e.reportDate ? new Date(e.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MemberManageBox;