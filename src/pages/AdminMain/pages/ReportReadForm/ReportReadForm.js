import parentStyle from '../../AdminMain.module.css';
import style from './ReportReadForm.module.css';
import { useLocation, Link } from 'react-router-dom';
import PurpleRoundBtn from '../../../../components/PurpleRoundBtn/PurpleRoundBtn';
import WhiteRoundBtn from '../../../../components/WhiteRoundBtn/WhiteRoundBtn';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ReportReadForm = () => {
    const location = useLocation();
    const id = location.state.id; // location으로 데이터에 접근해 받아옴
    const category = location.state.category;

    const [report, setReport] = useState([{}]);

    console.log("category:" + category);

    useEffect(() => {
        axios.get(`/api/admin/reportDetailInfo`, {
            params: {
                id: id,
                category: category
            }
        }).then(resp => {
            setReport(resp.data);
        })
    }, [])

    return (
        <div className={parentStyle.background}>
            <div className={parentStyle.body}>
                <div className={style.reportBox}>
                    <div className={style.reportTitle}>신고 내역</div>
                    <hr></hr>
                    <div className={style.reportDate}>{report.reportDate ? new Date(report.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                    <div className={style.reportContent}>{report.content}</div>
                    <div className={style.reporterId}>신고자 : {report.memberReporterId}</div>
                    <Link to="" className={style.moveToPost}>신고 게시물로 이동</Link>
                    <hr></hr>
                    <div className={style.reportBtns}>
                        <WhiteRoundBtn title={"신고 거부"}></WhiteRoundBtn>
                        <PurpleRoundBtn title={"신고 승인"} activation={true}></PurpleRoundBtn>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportReadForm;