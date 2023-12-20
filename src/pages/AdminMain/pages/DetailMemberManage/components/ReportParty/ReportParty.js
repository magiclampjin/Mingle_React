import style from "../../../../AdminMain.module.css"
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import WhiteRoundBtn from '../../../../../../components/WhiteRoundBtn/WhiteRoundBtn'
import LoadingSpinnerMini from '../../../.././../../components/LoadingSpinnerMini/LoadingSpinnerMini';

const ReportParty = () => {

    const [report, setReport] = useState([{}]);
    const [isServiceLoading, setServiceLoading] = useState(false);

    useEffect(() => {
        setServiceLoading(true);

        axios.get("/api/admin/reportPartyList").then(resp => {
            setReport(resp.data);
            setServiceLoading(false);
        }).catch(() => {
            setServiceLoading(false);
        });
    }, []);

    return (
        <>
        <div className={style.box}>
            <div className={style.componentTitle}>파티 신고</div>
            <div className={style.componentBox}>
            {isServiceLoading ? (
                <LoadingSpinnerMini height={350} />
            ) : (
                <>
                <div className={style.componentSeeMore}>
                    <div></div>
                    <div className={style.componentSeeMoreBtn}>
                    <Link to="DetailReportParty">
                        <WhiteRoundBtn title={"더보기"} activation={true}></WhiteRoundBtn>
                    </Link>
                    </div>
                </div>
                {report.map((e, i) => {
                    return(
                        <div key={i} className={style.componentLine}>
                            <div className={style.componentItem}>{e.id}</div>
                            <div className={style.componentItem}>{e.memberReporterId}</div>
                            <div className={style.componentItem}>{e.content}</div>
                            <div className={style.componentItem}>{e.reportDate ? new Date(e.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                        </div>
                    );
                })}
                </>
            )}
            </div>
        </div>
        </>
    );
}

export default ReportParty;