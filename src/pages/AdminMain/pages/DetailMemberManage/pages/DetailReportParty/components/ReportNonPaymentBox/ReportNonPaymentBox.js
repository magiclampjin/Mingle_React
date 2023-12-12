import parentStyle from '../../../../../../../AdminMain/AdminMain.module.css'
import style from '../../../../DetailMemberManage.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

const ReportNonPaymentBox = () => {

    const [report, setReport] = useState([{}]);

    useEffect(() => {
        const category = "미납";
        axios.get(`/api/admin/reportPartyCategoryList/${category}`).then(resp => {
            console.log(resp.data);
            setReport(resp.data);
        });
    }, []);

    return (
        <div className={parentStyle.box}>
            <div className={parentStyle.componentTitle}>파티 미납 신고</div>
            <div className={style.componentBox}>
                {report.map((e, i) => {
                    return(
                        <div className={style.componentLine}>
                            <div className={parentStyle.componentItem}>{e.id}</div>
                            <div className={parentStyle.componentItem}>{e.memberReporterId}</div>
                            <div className={parentStyle.componentItem}>{e.content}</div>
                            <div className={parentStyle.componentItem}>{e.reportDate ? new Date(e.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ReportNonPaymentBox;