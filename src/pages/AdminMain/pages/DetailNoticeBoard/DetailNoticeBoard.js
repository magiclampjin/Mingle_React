import parentStyle from "../../AdminMain.module.css";
import style from "../DetailMemberManage/DetailMemberManage.module.css";
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
import "../../../../components/Pagination/Pagination.css";

const DetailNoticeBoard = () => {

    const [notice, setNotice] = useState([{}]);

    useEffect(() => {
        axios.get("/api/admin/noticeBoardList").then(resp => {
            setNotice(resp.data);
        });
    }, []);

    // 페이지네이션
    const [currentNotices, setCurrentNotices] = useState(notice);
    const [page, setPage] = useState(1);
    const noticePerPage = 10; // 페이지 당 유저 출력 수
    const indexOfLastPage = page * noticePerPage;
    const indexOfFirstPage = indexOfLastPage - noticePerPage;

    const handlePageChange = (page) => {
        setPage(page);
    };

    useEffect(() => {
        setCurrentNotices(notice.slice(indexOfFirstPage, indexOfLastPage));
    }, [notice, page]);

    return (
        <div className={parentStyle.background}>
            <div className={parentStyle.body}>
                <div className={parentStyle.box}>
                    <div className={parentStyle.componentTitle}>공지 게시판</div>
                    <div className={style.componentBox}>
                        {currentNotices.map((e, i) => {
                            return(
                                <Link key={i} to="/admin/noticeReadForm" state={{id : e.id}}>
                                    <div className={style.componentLine}>
                                        <div className={parentStyle.componentItem}>{e.id}</div>
                                        <div className={parentStyle.componentItem}>{e.title}</div>
                                        <div className={parentStyle.componentItem}>{e.content}</div>
                                        <div className={parentStyle.componentItem}>{e.writeDate ? new Date(e.writeDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    {notice.length > 0 && (
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={noticePerPage}
                            totalItemsCount={notice.length}
                            pageRangeDisplayed={10}
                            prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
                            nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
                            lastPageText={<FontAwesomeIcon icon={faAnglesRight} />}
                            firstPageText={<FontAwesomeIcon icon={faAnglesLeft} />}
                            onChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailNoticeBoard;