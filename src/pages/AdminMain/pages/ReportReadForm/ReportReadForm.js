import parentStyle from '../../AdminMain.module.css';
import style from './ReportReadForm.module.css';
import { useLocation, Link } from 'react-router-dom';
import PurpleRoundBtn from '../../../../components/PurpleRoundBtn/PurpleRoundBtn';
import WhiteRoundBtn from '../../../../components/WhiteRoundBtn/WhiteRoundBtn';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

const ReportReadForm = () => {

    const location = useLocation();
    const id = location.state.id; // location으로 데이터에 접근해 받아옴
    const category = location.state.category;

    const [reportObj, setReportObj] = useState(null);

    // 선택한 서비스 정보 불러오기 로딩
    const [isServiceLoading, setServiceLoading] = useState(false);

    useEffect(() => {
        let url; // category에 따른 서버 경로를 저장할 변수
        
        // 게시글
        if (category === "게시글") {
            url = `/api/admin/reportPostDetailInfo/${id}`;
        // 댓글
        } else if (category === "댓글") {
            url = `/api/admin/reportReplyDetailInfo/${id}`;
        // 파티
        } else if (category.includes("파티")) {
            url = `/api/admin/reportPartyDetailInfo/${id}`;
        }
    
        setServiceLoading(true);

        if (url) {
            axios.get(url).then(resp => {
                setReportObj(resp.data);
                setServiceLoading(false);
            }).catch(() => {
                setServiceLoading(false);
            });
        }
    }, [category, id]);

    return (
        isServiceLoading ? (
            <LoadingSpinner />
        ) : (
        <div className={parentStyle.background}>
            <div className={parentStyle.body}>
                <div className={style.reportBox}>
                    <div className={style.reportTitle}>신고 내역 : {category}</div>
                    <hr></hr>
                    {reportObj && ( // reportObj 안에 값이 존재해야만 실행
                    <>
                        <div className={style.reportDate}>{reportObj.report.reportDate ? new Date(reportObj.report.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                        <div className={style.reportContent}>{reportObj.report.content}</div>
                        {category === "게시글" && (
                            <div className={style.reporterId}>신고대상자 : {reportObj.post.memberId}</div>
                        )}
                        {category === "댓글" && (
                            <div className={style.reporterId}>신고대상자 : {reportObj.reply.memberId}</div>
                        )}
                        {category.includes("파티") && (
                            <div className={style.reporterId}>신고대상자 : {reportObj.memberId}</div>
                        )}
                        <div className={style.reporterId}>신고자 : {reportObj.report.memberReporterId}</div>
                    </>
                    )}
                    <Link to="" className={style.moveToPost}>신고 게시물로 이동</Link>
                    <hr></hr>
                    <div className={style.reportBtns}>
                        <WhiteRoundBtn title={"신고 거부"}></WhiteRoundBtn>
                        <PurpleRoundBtn title={"신고 승인"} activation={true}></PurpleRoundBtn>
                    </div>
                </div>
            </div>
        </div>
    ));
}

export default ReportReadForm;