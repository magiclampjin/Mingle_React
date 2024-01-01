import parentStyle from '../../AdminMain.module.css';
import style from './ReportReadForm.module.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PurpleRoundBtn from '../../../../components/PurpleRoundBtn/PurpleRoundBtn';
import WhiteRoundBtn from '../../../../components/WhiteRoundBtn/WhiteRoundBtn';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

const ReportReadForm = () => {

    const location = useLocation();
    const id = location.state.id; // location으로 데이터에 접근해 받아옴
    const category = location.state.category;

    const [reportObj, setReportObj] = useState(null); // 신고 정보
    const [memberId, setMemberId] = useState(null); // 신고 대상자
    const [warningCount, setWarningCount] = useState(0); // 경고 횟수
    const [postId, setPostId] = useState(null); // 신고 게시물

    const navigate = useNavigate();

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

        // 신고 정보
        axios.get(url).then(resp => {
            setReportObj(resp.data);

            let memberId; // 신고 대상자를 저장하는 변수
            let postId; // 신고 게시물의 아이디를 저장하는 변수
            if (category === "게시글") {
                memberId = resp.data.post.member.id;
                postId = resp.data.postId;
            } else if (category === "댓글") {
                memberId = resp.data.reply.member.id;
                postId = resp.data.reply.postId;
            } else if (category.includes("파티")) {
                memberId = resp.data.memberId;
            }

            setMemberId(memberId);
            setPostId(postId);
            setServiceLoading(false);
        }).catch(() => {
            setServiceLoading(false);
        });

        // 신고 대상자의 경고 횟수
        axios.get(`/api/admin/memberWarningCount/${memberId}`).then(resp => {
            let cnt = resp.data;
            setWarningCount(cnt);
        })

    }, [category, id, memberId]);

    // 신고 승인
    const handleApproval = async (reportId, memberId) => {
        const isConfirmed = window.confirm("신고를 승인하시겠습니까?");

        if(isConfirmed) {
            try {
                axios.put(`/api/admin/reportProcess/${reportId}`); // 신고 처리 true로 변경
                axios.post(`/api/admin/giveWarning`, { reportId, memberId }); // 신고 테이블에 회원 등록

                alert("신고가 승인되었습니다."); // 신고 처리 후 alert창
                navigate(-1); // 이전 페이지로 이동
                
            } catch (error) {
                alert("문제가 발생했습니다");
            }
        }
    }

    // 신고 반려
    const handleRejection = (reportId) => {
        const isConfirmed = window.confirm("신고를 반려하시겠습니까?");
        if(isConfirmed) {
            axios.put(`/api/admin/reportProcess/${reportId}`); // 신고 처리 true로 변경

            alert("신고가 반려되었습니다."); // 신고 처리 후 alert창
            navigate(-1); // 이전 페이지로 이동
        }
    }

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
                        <div className={style.reporterId}>신고대상자 : {memberId} [경고 : {warningCount}]</div>
                        <div className={style.reporterId}>신고자 : {reportObj.report.memberReporterId}</div>
                    </>
                    )}
                    <Link to={`/board/post/${postId}`} className={style.moveToPost}>
                        {category === "게시글" || category === "댓글" ? "신고 게시물로 이동" : null}
                    </Link>
                    <hr></hr>
                    <div className={style.reportBtns}>
                        <WhiteRoundBtn title={"신고 반려"} onClick={() => handleRejection(reportObj.reportId)}></WhiteRoundBtn>
                        <PurpleRoundBtn title={"신고 승인"} activation={true} onClick={() => handleApproval(reportObj.reportId, memberId)}></PurpleRoundBtn>
                    </div>
                </div>
            </div>
        </div>
    ));
}

export default ReportReadForm;