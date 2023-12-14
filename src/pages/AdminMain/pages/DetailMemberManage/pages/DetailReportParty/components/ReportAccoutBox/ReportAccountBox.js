import parentStyle from '../../../../../../../AdminMain/AdminMain.module.css'
import style from '../../../../DetailMemberManage.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReportAccountBox = () => {

    const [report, setReport] = useState([{}]);
    const category = "계정";

    useEffect(() => {
        axios.get(`/api/admin/reportPartyCategoryList/${category}`).then(resp => {
            console.log(resp.data);
            setReport(resp.data);
        });
    }, []);

    return (
        <div className={style.box}>
            <div className={parentStyle.componentTitle}>파티 계정 신고</div>
            <div className={style.componentBox}>
                {report.map((e, i) => {
                    return(
                        <Link to="/admin/ReportReadForm" state={{id : e.id, category : `파티 ${category}`}}>
                            <div className={style.componentLine}>
                                <div className={parentStyle.componentItem}>{e.id}</div>
                                <div className={parentStyle.componentItem}>{e.memberReporterId}</div>
                                <div className={parentStyle.componentItem}>{e.content}</div>
                                <div className={parentStyle.componentItem}>{e.reportDate ? new Date(e.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default ReportAccountBox;