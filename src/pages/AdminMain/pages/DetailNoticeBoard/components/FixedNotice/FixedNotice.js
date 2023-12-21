import parentStyle from "../../../../AdminMain.module.css";
import style from "../../DetailNoticeBoard.module.css";
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
import "../../../../../../components/Pagination/Pagination.css";
import "../../../../../../components/WhiteRoundBtn/WhiteRoundBtn"
import WhiteRoundBtn from "../../../../../../components/WhiteRoundBtn/WhiteRoundBtn";
import LoadingSpinnerMini from '../../../../../../components/LoadingSpinnerMini/LoadingSpinnerMini';

// html 태그를 제거하는 함수 (공지글 내용 출력)
const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

const FixedNotice = () => {

    const [notice, setNotice] = useState([{}]);
    const [isServiceLoading, setServiceLoading] = useState(false);

    useEffect(() => {
        setServiceLoading(true);

        axios.get("/api/admin/fixedNoticeBoardList").then(resp => {
            setNotice(resp.data);
            setServiceLoading(false);
        }).catch(() => {
            setServiceLoading(false);
        });
    }, []);

    // 고정 해제
    const handleUnfix = (e, id) => {
        e.preventDefault(); // 고정 해제 버튼을 눌렀을 땐 게시글로 이동 X

        let result = window.confirm("공지글의 고정을 해제하시겠습니까?");
        if(result) {
            axios.put(`/api/admin/unfixNoticeBoard/${id}`).then(() => {
                alert("고정이 해제되었습니다.");
                window.location.reload();
            })
        }
    }

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
        <div className={parentStyle.box}>
            <div className={parentStyle.componentTitle}>고정 중인 공지글</div>
            <div className={style.componentBox}>
            {isServiceLoading ? (
                <LoadingSpinnerMini height={500} />
            ) : (
                <>
                {currentNotices.map((item, i) => {
                    return(
                        <Link key={i} to={`/board/post/${item.id}`} state={{id : item.id}}>
                            <div className={style.componentLine}>
                                <div className={parentStyle.componentItem}>{item.id}</div>
                                <div className={parentStyle.componentItem}>{item.title}</div>
                                <div className={parentStyle.componentItem}>{removeHtmlTags(item.content)}</div>
                                <div className={parentStyle.componentItem}>{item.writeDate ? new Date(item.writeDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                                <div className={parentStyle.componentItem} onClick={(e) => handleUnfix(e, item.id)}>
                                    <WhiteRoundBtn title={"고정 해제"} activation={true}></WhiteRoundBtn>
                                </div>
                            </div>
                        </Link>
                    );
                })}
                </>
            )}
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
    );
}

export default FixedNotice;