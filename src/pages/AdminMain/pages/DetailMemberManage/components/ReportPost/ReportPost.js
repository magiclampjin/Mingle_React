import parentStyle from "../../../../AdminMain.module.css";
import style from "../../DetailMemberManage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAnglesLeft,
    faAngleRight,
    faAnglesRight,
  } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
import "../../../../../../components/Pagination/Pagination.css"

const ReportPost = () => {

    const [report, setReport] = useState([{}]);

    useEffect(() => {
        axios.get("/api/admin/reportPostList").then(resp => {
            setReport(resp.data);
        });
    }, []);

    // 페이지네이션
    const [currentReports, setCurrentReports] = useState(report);
    const [page, setPage] = useState(1);
    const reportPerPage = 10; // 페이지 당 유저 출력 수
    const indexOfLastPage = page * reportPerPage;
    const indexOfFirstPage = indexOfLastPage - reportPerPage;

    const handlePageChange = (page) => {
        setPage(page);
    };

    useEffect(() => {
        setCurrentReports(report.slice(indexOfFirstPage, indexOfLastPage));
    }, [report, page]);

    return (
        <>
        <div className={parentStyle.box}>
            <div className={parentStyle.componentTitle}>게시글 신고</div>
            <div className={style.componentBox}>
                {currentReports.map((e, i) => {
                    return(
                        <Link key={i} to="/admin/ReportReadForm" state={{id : e.id, category: "게시글"}}>
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
            {report.length > 0 && (
                <Pagination
                    activePage={page}
                    itemsCountPerPage={reportPerPage}
                    totalItemsCount={report.length}
                    pageRangeDisplayed={10}
                    prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
                    nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
                    lastPageText={<FontAwesomeIcon icon={faAnglesRight} />}
                    firstPageText={<FontAwesomeIcon icon={faAnglesLeft} />}
                    onChange={handlePageChange}
                />
            )}
        </div>
        </>
    );
}

export default ReportPost;