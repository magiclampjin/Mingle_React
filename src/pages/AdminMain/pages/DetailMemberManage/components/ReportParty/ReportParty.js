import parentStyle from "../../../../AdminMain.module.css"
import style from "../../DetailMemberManage.module.css"
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import WhiteRoundBtn from '../../../../../../components/WhiteRoundBtn/WhiteRoundBtn'

const ReportParty = () => {

    const [report, setReport] = useState([{}]);

    useEffect(() => {
        axios.get("/api/admin/reportPartyList").then(resp => {
            setReport(resp.data);
        });
    }, []);

    return (
        <>
        <div className={parentStyle.box}>
            <div className={parentStyle.componentTitle}>파티 신고</div>
            <div className={style.componentBox}>
                <div className={parentStyle.componentSeeMore}>
                    <div></div>
                    <div className={parentStyle.componentSeeMoreBtn}>
                    <Link to="DetailReportParty">
                        <WhiteRoundBtn title={"더보기"} activation={true}></WhiteRoundBtn>
                    </Link>
                    </div>
                </div>
                {report.map((e, i) => {
                    return(
                        <div key={i} className={style.componentLine}>
                            <div className={parentStyle.componentItem}>{e.id}</div>
                            <div className={parentStyle.componentItem}>{e.memberReporterId}</div>
                            <div className={parentStyle.componentItem}>{e.content}</div>
                            <div className={parentStyle.componentItem}>{e.reportDate ? new Date(e.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}

export default ReportParty;