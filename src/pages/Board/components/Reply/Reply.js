import React, { useState, useEffect, useContext } from 'react';
import styles from "./Reply.module.css";
import axios from 'axios';
import { LoginContext } from '../../../../App';
import Pagination from 'react-js-pagination';

// 댓글 작성 시간 포맷팅 함수
const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleString(); // 또는 원하는 형식으로 포맷팅
};

// 댓글과 대댓글을 포함한 전체 댓글 리스트를 평탄화하는 함수
const flattenReplies = (replies) => {
    return replies.reduce((acc, reply) => {
        acc.push(reply); // 부모 댓글 추가
        if (reply.childrenReplies && reply.childrenReplies.length > 0) {
            acc.push(...flattenReplies(reply.childrenReplies)); // 대댓글 추가
        }
        return acc;
    }, []);
};

const RenderReplies = ({ replies, allReplies, onReplyClick, onChildReplyClick }) => {
    // 부모 댓글의 닉네임을 찾는 함수
    const findParentNicknameById = (parentId) => {
        const parentReply = allReplies.find(reply => reply.id === parentId);
        return parentReply ? parentReply.member.nickname : null;
    };

    return (
        <div>
            {replies.sort((a, b) => a.id - b.id).map((reply, index) => {
                // replyAdoptiveParentId가 있는 경우 해당 ID를 가진 댓글의 작성자 닉네임 찾기
                const adoptiveParentNickname = reply.replyAdoptiveParentId
                    ? findParentNicknameById(reply.replyAdoptiveParentId)
                    : null;

                return (
                    <div
                        key={reply.id}
                        className={styles.replyItem}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (reply.parentReply) {
                                onChildReplyClick(reply.id, reply.parentReply.id);
                            } else {
                                onReplyClick(reply.id);
                            }
                        }}
                    >

                        {/* 댓글 내용 */}
                        <div className={styles.replyContent}>
                            <div className={styles.profileImage}></div> {/* 프로필 이미지 추가 필요 */}
                            <div className={styles.replyText}>
                                <span className={styles.memberName}>{reply.member.nickname}</span>
                                {/* 대댓글일 경우 부모 또는 양부모의 닉네임을 멘션으로 표시 */}
                                {adoptiveParentNickname ? (
                                    <span className={styles.mention}>@{adoptiveParentNickname}</span>
                                ) : (
                                    reply.parentReply && <span className={styles.mention}>@{reply.parentReply.member.nickname}</span>
                                )}
                                <span>{reply.content}</span>
                                <div className={styles.replyTime}>{formatTime(reply.writeDate)}</div>
                            </div>
                        </div>

                        {/* 대댓글 목록 */}
                        {reply.childrenReplies && reply.childrenReplies.length > 0 && (
                            <div className={styles.childReplies}>
                                <RenderReplies
                                    replies={reply.childrenReplies}
                                    allReplies={allReplies}
                                    onReplyClick={onReplyClick}
                                    onChildReplyClick={onChildReplyClick}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const Reply = ({ replies,postId }) => {

    const [allReplies, setAllReplies] = useState([]);


    const [newReply, setNewReply] = useState("");

    // 새로운 상태 추가
    const [selectedParentReply, setSelectedParentReply] = useState(null);
    const [selectedAdoptiveParentReply, setSelectedAdoptiveParentReply] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const repliesPerPage = 7; // 페이지당 댓글 수
    const [currentReplies, setCurrentReplies] = useState([]); // 현재 페이지에 표시할 댓글들

    // 페이지가 변경될 때마다 실행될 useEffect
    useEffect(() => {
        const flattenedReplies = flattenReplies(replies); // 모든 댓글 평탄화
        const indexOfLastReply = currentPage * repliesPerPage; // 현재 페이지의 마지막 댓글 인덱스
        const indexOfFirstReply = indexOfLastReply - repliesPerPage; // 현재 페이지의 첫 댓글 인덱스
        setCurrentReplies(flattenedReplies.slice(indexOfFirstReply, indexOfLastReply));
    }, [replies, currentPage]);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleReplyChange = (e) => {
        setNewReply(e.target.value);
    };

    const handleReplyClick = (replyId) => {
        console.log("Reply clicked:", replyId);
        setSelectedParentReply(replyId);
        setSelectedAdoptiveParentReply(null);
    };

    const handleChildReplyClick = (replyId, parentReplyId) => {
        console.log("Child reply clicked:", replyId, "Parent reply:", parentReplyId);
        setSelectedParentReply(parentReplyId);
        setSelectedAdoptiveParentReply(replyId);
    };

    const submitReply = () => {
        // 댓글 제출 로직
        console.log("Submitting reply:", newReply);
        // 여기에 댓글을 서버로 보내는 코드 추가
        setNewReply(""); // 입력 필드 초기화
    };

    // replies prop이 변경될 때마다 allReplies를 업데이트합니다.
    useEffect(() => {
        const flattenedReplies = replies.flatMap(reply => [reply, ...reply.childrenReplies]);
        setAllReplies(flattenedReplies);
    }, [replies]);

    // 현재 페이지나 allReplies 상태가 변경될 때마다 currentReplies를 업데이트합니다.
    useEffect(() => {
        const indexOfLastReply = currentPage * repliesPerPage;
        const indexOfFirstReply = indexOfLastReply - repliesPerPage;
        setCurrentReplies(allReplies.slice(indexOfFirstReply, indexOfLastReply));
    }, [currentPage, allReplies]);



    return (
        <div className={styles.reply__section}>
            댓글
            <RenderReplies
                replies={currentReplies}
                allReplies={allReplies}
                onReplyClick={handleReplyClick}
                onChildReplyClick={handleChildReplyClick} />

            {/* 페이지네이션 */}
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={repliesPerPage}
                totalItemsCount={flattenReplies(replies).length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
            <div className={styles.replyForm}>
                <textarea
                    className={styles.replyInput}
                    value={newReply}
                    onChange={handleReplyChange}
                    placeholder="댓글을 작성하세요"
                />
                <button onClick={submitReply} className={styles.replyButton}>댓글 작성</button>
            </div>
        </div>
    );
};

export default Reply;
