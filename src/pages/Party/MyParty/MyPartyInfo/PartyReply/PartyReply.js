import React, { useState, useEffect, useContext } from 'react';
import styles from "./PartyReply.module.css";
import axios from 'axios';
import { LoginContext } from '../../../../../App';
import Pagination from 'react-js-pagination';
import DOMPurify from 'dompurify';
import LoadingSpinner from '../../../../../components/LoadingSpinner/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

// 댓글 작성 시간 포맷팅 함수
const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleString(); // 또는 원하는 형식으로 포맷팅
};

//댓글과 대댓글을 포함한 전체 댓글 리스트를 평탄화하는 함수
const flattenReplies = (replies) => {
    return replies.reduce((acc, reply) => {
        acc.push(reply); // 부모 댓글 추가
        if (reply.childrenPartyReplies && reply.childrenPartyReplies.length > 0) {
            acc.push(...flattenReplies(reply.childrenPartyReplies)); // 대댓글 추가
        }
        return acc;
    }, []);
};


const ReplyForm = ({ content, setContent, onSubmit, onCancel, placeholder, isSecret, setIsSecret }) => {

    const handleChange = (e) => {
        const clearText = DOMPurify.sanitize(e.target.value);
        setContent(clearText);
    };

    const handleSecretChange = (e) => {
        setIsSecret(e.target.checked);
    }

    const handleSubmit = () => {
        // 글자 수가 1000자를 초과하는 경우 경고 메시지를 표시하고 제출하지 않음
        if (content.length > 1000) {
            alert("댓글은 1000자를 초과할 수 없습니다.");
            return;
        }
        onSubmit();
        setContent('');
    };

    const handleCancel = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        onCancel();
    };

    return (
        <div className={styles.replyForm}>
            <textarea
                className={styles.replyInput}
                value={content}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <div className={styles.checkForm}>
                <div className={styles.secretCheckboxContainer}>
                    <input
                        type="checkbox"
                        checked={isSecret}
                        onChange={(e) => setIsSecret(e.target.checked)}
                    />
                    <label className={styles.secretCheckboxLabel}>
                        비밀댓글
                    </label>
                </div>
                <div className={styles.replyCounter}>
                    댓글 글자 수 : {content.length}/1000
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={handleSubmit} className={styles.rereplyButton}>대댓글 작성</button>
                <button onClick={handleCancel} className={styles.cancelButton}>취소</button>
            </div>
        </div>
    );
};

const UpdateReplyForm = ({ content, setContent, onSubmit, onCancel, placeholder, isSecret, setIsSecret }) => {

    const handleChange = (e) => {
        const clearText = DOMPurify.sanitize(e.target.value);
        setContent(clearText);
    };

    const handleSecretChange = (e) => {
        setIsSecret(e.target.checked);
    }

    const handleSubmit = () => {
        // 글자 수가 1000자를 초과하는 경우 경고 메시지를 표시하고 제출하지 않음
        if (content.length > 1000) {
            alert("댓글은 1000자를 초과할 수 없습니다.");
            return;
        }
        onSubmit();
        setContent('');
    };

    const handleCancel = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        onCancel();
    };

    return (
        <div className={styles.replyForm}>
            <textarea
                className={styles.replyInput}
                value={content}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <div className={styles.checkForm}>
                <div className={styles.secretCheckboxContainer}>
                    <input
                        type="checkbox"
                        checked={isSecret}
                        onChange={(e) => handleSecretChange}
                    />
                    <label className={styles.secretCheckboxLabel}>
                        비밀댓글
                    </label>
                </div>
                <div className={styles.replyCounter}>
                    댓글 글자 수 : {content.length}/1000
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={handleSubmit} className={styles.rereplyButton}>댓글 수정</button>
                <button onClick={handleCancel} className={styles.cancelButton}>취소</button>
            </div>
        </div>
    );
}

const RenderReplies = ({ content, setContent, replies, allReplies, setSelectedParentReply, setSelectedAdoptiveParentReply, replyingTo, handleCommentReply, setReplyingTo, selectedParentReply, handleCancelReplyClick, selectedAdoptiveParentReply, editingReply, setEditingReply, handleEditButtonClick, handleEditReply, handleDeleteReply, isSecret, setIsSecret, managerId, isPartyEnd }) => {

    const { loginId } = useContext(LoginContext);

    // 부모 댓글의 닉네임을 찾는 함수
    const findParentNicknameById = (parentId) => {
        const parentPartyReply = allReplies.find(reply => reply.id === parentId);
        return parentPartyReply ? parentPartyReply.member.nickname : null;
    };


    // 대댓글 토글 상태를 관리하기 위한 상태
    const [toggleReplies, setToggleReplies] = useState({});

    // 대댓글 작성 버튼 클릭 핸들러
    const handleReplyButtonClick = (e, replyId, parentPartyReplyId = null) => {
        e.stopPropagation(); // 댓글 클릭 이벤트 버블링 방지
        if (parentPartyReplyId) {
            // 부모 대댓글 ID가 있는 경우 (즉, 대댓글에 대댓글을 달 때)
            setSelectedParentReply(parentPartyReplyId);
            setSelectedAdoptiveParentReply(replyId);
        } else {
            // 단순 대댓글을 달 때
            setSelectedParentReply(replyId);
            setSelectedAdoptiveParentReply(null);
        }
        setReplyingTo(replyId); // 대댓글 작성 상태 설정
    };

    // 특정 댓글의 대댓글을 토글하는 함수
    const toggleChildReplies = (id) => {
        setToggleReplies(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div>
            {replies.sort((a, b) => new Date(a.writeDate) - new Date(b.writeDate)).map((reply, index) => {
                // partyReplyAdoptiveParentId가 있는 경우 해당 ID를 가진 댓글의 작성자 닉네임 찾기
                const adoptiveParentNickname = reply.partyReplyAdoptiveParentId
                    ? findParentNicknameById(reply.partyReplyAdoptiveParentId)
                    : null;
                if (!reply.parentPartyReply) {
                    return (
                        <div
                            key={reply.id}
                            className={styles.replyItem}
                        >


                            {/* 댓글 내용 */}
                            {/* 수정 중인 댓글인 경우 UpdateReplyForm 렌더링 */}
                            {editingReply && editingReply.id === reply.id ? (
                                <UpdateReplyForm
                                    content={editingReply.content}
                                    setContent={(newContent) => setEditingReply({ ...editingReply, content: newContent })}
                                    onSubmit={() => handleEditReply(editingReply.id, editingReply.content)}
                                    onCancel={() => setEditingReply(null)}
                                    placeholder="댓글을 수정하세요"
                                    isSecret={isSecret}
                                    setIsSecret={setIsSecret}
                                />
                            ) : (
                                <div className={styles.replyContent}>
                                    {/*비밀 댓글 일 경우 출력하는 부분이 달라지도록 만듦*/}
                                    {reply.isSecret && loginId !== reply.member.id && loginId !== managerId ? (
                                        <div className={styles.secretReply}>
                                            <FontAwesomeIcon icon={faLock} /> <span>비밀댓글 입니다</span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className={styles.profileImage}></div> {/* 프로필 이미지 추가 필요 */}
                                            <div className={styles.replyText}>
                                                <span className={styles.memberName}>{reply.member.nickname}</span>
                                                {/* 대댓글일 경우 부모 또는 양부모의 닉네임을 멘션으로 표시 */}
                                                {adoptiveParentNickname ? (
                                                    <span className={styles.mention}>@{adoptiveParentNickname}</span>
                                                ) : (
                                                    reply.parentPartyReply && <span className={styles.mention}>@{reply.parentPartyReply.member.nickname}</span>
                                                )}
                                                <span>{reply.content}</span>
                                                <div className={styles.replyTime}>{formatTime(reply.writeDate)}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}


                            {/* 대댓글 달기 버튼과 기타 버튼 컨테이너 */}
                            <div className={styles.replyActionsContainer}>
                                {/*비밀 댓글 일 경우 출력하는 부분이 달라지도록 만듦*/}
                                {!reply.isSecret || loginId === reply.member.id || loginId === managerId ? (
                                    <>
                                        {/* 댓글 펼치기 버튼 */}
                                        {reply.childrenPartyReplies && reply.childrenPartyReplies.length > 0 && (
                                            <span className={styles.reply__hide__buttton} onClick={() => toggleChildReplies(reply.id)}>
                                                {toggleReplies[reply.id] ? `▲ 숨기기` : `▼ 댓글 ${reply.childrenPartyReplies.length}개 펼치기`}
                                            </span>
                                        )}

                                        |
                                        {/* 대댓글 달기 버튼 */}
                                        <span className={styles.replyActionButton} onClick={isPartyEnd?()=>{}:(e) => {
                                            handleReplyButtonClick(e, reply.id, reply.parentPartyReply ? reply.parentPartyReply.id : null);
                                        }}>
                                            대댓글 달기
                                        </span>
                                        {(loginId === reply.member.id || loginId === managerId) && (
                                            <>
                                                {/* 수정하기 버튼 */}
                                                {!reply.content.includes("에 의해 지워진 댓글입니다") && (
                                                    <>
                                                        |
                                                        <span className={styles.replyActionButton} onClick={() => handleEditButtonClick(reply)}>
                                                            수정하기
                                                        </span>
                                                    </>
                                                )}
                                                |
                                                {/* 삭제하기 버튼 */}
                                                <span className={styles.replyActionButton} onClick={() => handleDeleteReply(reply.id, reply.parentPartyReply ? reply.parentPartyReply.id : null)}>
                                                    삭제하기
                                                </span>
                                            </>
                                        )}
                                    </>
                                ) : null}
                            </div>

                            {/* 대댓글 목록 */}
                            {toggleReplies[reply.id] && reply.childrenPartyReplies && reply.childrenPartyReplies.length > 0 && Array.isArray(reply.childrenPartyReplies) && (
                                <div className={styles.childReplies}>
                                    {/* 대댓글 리스트 렌더링 */}
                                    <RenderChildReplies
                                        content={content}
                                        setContent={setContent}
                                        replies={reply.childrenPartyReplies}
                                        allReplies={allReplies}
                                        setSelectedParentReply={setSelectedParentReply}
                                        setSelectedAdoptiveParentReply={setSelectedAdoptiveParentReply}
                                        replyingTo={replyingTo}
                                        setReplyingTo={setReplyingTo}
                                        selectedParentReply={selectedParentReply}
                                        handleCancelReplyClick={handleCancelReplyClick}
                                        selectedAdoptiveParentReply={selectedAdoptiveParentReply}
                                        handleCommentReply={handleCommentReply}
                                        // 댓글 업데이트 로직
                                        editingReply={editingReply}
                                        setEditingReply={setEditingReply}
                                        handleEditButtonClick={handleEditButtonClick}
                                        handleEditReply={handleEditReply}
                                        // 댓글 삭제 로직
                                        handleDeleteReply={handleDeleteReply}
                                        // 비밀댓글 여부
                                        isSecret={isSecret}
                                        setIsSecret={setIsSecret}
                                        // 파티 매니저 id
                                        managerId={managerId}

                                    />

                                </div>
                            )}

                            {replyingTo === reply.id && (
                                <div className={styles.selectedReplyInfo}>
                                    {!selectedAdoptiveParentReply && (
                                        <div>
                                            <p>대댓글을 달 댓글 : <strong>{reply.member.nickname}</strong>: {reply.content.slice(0, 50)}...</p>
                                            <p>작성시간 : {formatTime(reply.writeDate)}</p>
                                        </div>
                                    )}

                                    {selectedAdoptiveParentReply && allReplies.find(r => r.id === selectedAdoptiveParentReply) && (
                                        <div>
                                            <p>대댓글을 달 댓글 : <strong>{allReplies.find(r => r.id === selectedAdoptiveParentReply).member.nickname}</strong>: {allReplies.find(r => r.id === selectedAdoptiveParentReply).content.slice(0, 50)}...</p>
                                            <p>작성시간 : {formatTime(allReplies.find(r => r.id === selectedAdoptiveParentReply).writeDate)}</p>
                                        </div>
                                    )}
                                </div>
                            )}


                            {/* 대댓글 작성 폼 */}
                            {replyingTo === reply.id && (
                                <ReplyForm
                                    content={content}
                                    setContent={setContent}
                                    onSubmit={handleCommentReply}
                                    onCancel={() => {
                                        handleCancelReplyClick();
                                        setReplyingTo(null)
                                    } // 취소 버튼 클릭 시 폼 숨기기
                                    }
                                    placeholder="대댓글을 작성하세요"
                                    isSecret={isSecret}
                                    setIsSecret={setIsSecret}
                                />
                            )}
                        </div>
                    );
                }

            })}
        </div>
    );
};


const RenderChildReplies = ({ replies, allReplies, replyingTo, setReplyingTo, setSelectedParentReply, setSelectedAdoptiveParentReply, editingReply, setEditingReply, handleEditButtonClick, handleEditReply, selectedAdoptiveParentReply, content, setContent, handleCommentReply, handleCancelReplyClick, handleDeleteReply, isSecret, setIsSecret, managerId }) => {
    const { loginId } = useContext(LoginContext);

    // 대댓글 작성 버튼 클릭 핸들러
    const handleReplyButtonClick = (e, replyId, parentPartyReplyId = null) => {
        e.stopPropagation(); // 댓글 클릭 이벤트 버블링 방지
        if (parentPartyReplyId) {
            // 부모 대댓글 ID가 있는 경우 (즉, 대댓글에 대댓글을 달 때)
            setSelectedParentReply(parentPartyReplyId);
            setSelectedAdoptiveParentReply(replyId);
        } else {
            // 단순 대댓글을 달 때
            setSelectedParentReply(replyId);
            setSelectedAdoptiveParentReply(null);
        }
        setReplyingTo(replyId); // 대댓글 작성 상태 설정
    };


    // 부모 댓글의 닉네임을 찾는 함수
    const findParentNicknameById = (parentId) => {
        const parentPartyReply = allReplies.find(reply => reply.id === parentId);
        return parentPartyReply ? parentPartyReply.member.nickname : null;
    };

    return (
        <div>
            {replies.sort((a, b) => new Date(a.writeDate) - new Date(b.writeDate)).map((reply) => {
                const adoptiveParentNickname = reply.partyReplyAdoptiveParentId
                    ? findParentNicknameById(reply.partyReplyAdoptiveParentId)
                    : null;

                return (
                    <div key={reply.id} className={styles.replyItem}>
                        {/* 댓글 내용 */}

                        {/* 수정 중인 댓글인 경우 UpdateReplyForm 렌더링 */}
                        {editingReply && editingReply.id === reply.id ? (
                            <UpdateReplyForm
                                content={editingReply.content}
                                setContent={(newContent) => setEditingReply({ ...editingReply, content: newContent })}
                                onSubmit={() => handleEditReply(editingReply.id, editingReply.content, reply.parentPartyReply.id)}
                                onCancel={() => setEditingReply(null)}
                                placeholder="댓글을 수정하세요"
                            />
                        ) : (
                            <div className={styles.replyContent}>
                                {reply.isSecret && loginId !== reply.member.id && loginId !== managerId ? (
                                    <div className={styles.secretReply}>
                                        <FontAwesomeIcon icon={faLock} /> <span>비밀댓글 입니다</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.profileImage}></div>
                                        <div className={styles.replyText}>
                                            <span className={styles.memberName}>{reply.member.nickname}</span>
                                            {/* 대댓글일 경우 부모 또는 양부모의 닉네임을 멘션으로 표시 */}
                                            {adoptiveParentNickname ? (
                                                <span className={styles.mention}>@{adoptiveParentNickname}</span>
                                            ) : (
                                                reply.parentPartyReply && <span className={styles.mention}>@{reply.parentPartyReply.member.nickname}</span>
                                            )}
                                            <span>{reply.content}</span>
                                            <div className={styles.replyTime}>{formatTime(reply.writeDate)}</div>
                                        </div>
                                    </>
                                )}
                            </div>

                        )}



                        {/* 대댓글 관련 액션 버튼 */}
                        <div className={styles.replyActionsContainer}>
                            {!reply.isSecret || loginId === reply.member.id || loginId === managerId ? (
                                <>
                                    {/* 대댓글 달기 버튼 */}
                                    <span className={styles.replyActionButton} onClick={(e) => {
                                        handleReplyButtonClick(e, reply.id, reply.parentPartyReply ? reply.parentPartyReply.id : null);
                                    }}>
                                        대댓글 달기
                                    </span>
                                    {(loginId === reply.member.id || loginId === managerId) && (
                                        <>
                                            {/* 수정하기 버튼 */}
                                            {!reply.content.includes("에 의해 지워진 댓글입니다") && (
                                                <>
                                                    |
                                                    <span className={styles.replyActionButton} onClick={() => handleEditButtonClick(reply)}>
                                                        수정하기
                                                    </span>
                                                </>
                                            )}
                                            |
                                            {/* 삭제하기 버튼 */}
                                            <span className={styles.replyActionButton} onClick={() => handleDeleteReply(reply.id, reply.parentPartyReply ? reply.parentPartyReply.id : null)}>
                                                삭제하기
                                            </span>
                                        </>
                                    )}
                                </>
                            ) : null}
                        </div>

                        {replyingTo === reply.id && (
                            <div className={styles.selectedReplyInfo}>
                                {!selectedAdoptiveParentReply && (
                                    <div>
                                        <p>대댓글을 달 댓글 : <strong>{reply.member.nickname}</strong>: {reply.content.slice(0, 50)}...</p>
                                        <p>작성시간 : {formatTime(reply.writeDate)}</p>
                                    </div>
                                )}

                                {selectedAdoptiveParentReply && allReplies.find(r => r.id === selectedAdoptiveParentReply) && (
                                    <div>
                                        <p>대댓글을 달 댓글 : <strong>{allReplies.find(r => r.id === selectedAdoptiveParentReply).member.nickname}</strong>: {allReplies.find(r => r.id === selectedAdoptiveParentReply).content.slice(0, 50)}...</p>
                                        <p>작성시간 : {formatTime(allReplies.find(r => r.id === selectedAdoptiveParentReply).writeDate)}</p>
                                    </div>
                                )}
                            </div>
                        )}


                        {/* 대댓글 작성 폼 */}
                        {replyingTo === reply.id && (
                            <ReplyForm
                                content={content}
                                setContent={setContent}
                                onSubmit={handleCommentReply}
                                onCancel={() => {
                                    handleCancelReplyClick();
                                    setReplyingTo(null)
                                } // 취소 버튼 클릭 시 폼 숨기기
                                }
                                placeholder="대댓글을 작성하세요"
                                isSecret={isSecret} // 비밀댓글 상태
                                setIsSecret={setIsSecret} // 비밀댓글 상태 변경 함수
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};


const PartyReply = ({ partyRegistrationId, isEnd}) => {

    const [isPartyEnd] = useState(isEnd);

    const { loginId } = useContext(LoginContext);

    const [replies, setReplies] = useState([]);

    const [allReplies, setAllReplies] = useState([]);

    const [replyingTo, setReplyingTo] = useState(null);

    const [isSecret, setIsSecret] = useState(false); // 비밀댓글 여부를 저장하는 상태

    const [newReply, setNewReply] = useState("");

    const [content, setContent] = useState("");

    const [managerId, setManagerId] = useState("");

    // 새로운 상태 추가
    const [selectedParentReply, setSelectedParentReply] = useState(null);
    const [selectedAdoptiveParentReply, setSelectedAdoptiveParentReply] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const repliesPerPage = 7; // 페이지당 댓글 수
    const [currentReplies, setCurrentReplies] = useState([]); // 현재 페이지에 표시할 댓글들

    const [submitReply, setSubmitReply] = useState({
        id: null,
        content: "",
        writeDate: null,
        partyRegistrationId: "",
        memberId: "",
        partyReplyParentId: 0,
        partyReplyAdoptiveParentId: 0,
        isSecret: false, // isSecret 필드 추가
    })


    // 수정 중인 댓글 상태 추가
    const [editingReply, setEditingReply] = useState(null);

    // 수정 버튼 클릭 핸들러
    const handleEditButtonClick = (reply) => {
        if(!isPartyEnd){
            setEditingReply({ id: reply.id, content: reply.content, isSecret: reply.isSecret });
        }
    };


    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleReplyChange = (e) => {
        if(!isPartyEnd){
            const clearText = DOMPurify.sanitize(e.target.value);
            setNewReply(clearText);
        }
    };


    const handleCancelReplyClick = () => {
        setSelectedParentReply(null);
        setReplyingTo(null); // 대댓글 작성 상태 설정
        setSelectedAdoptiveParentReply(null);
    };

    useEffect(() => {
        axios.get(`/api/party/reply/manager/${partyRegistrationId}`).then(resp => {
            setManagerId(resp.data);
        }).catch(error => console.error("Error loading managerId: ", error));
    }, [partyRegistrationId])

    useEffect(() => {
        // API 호출이 완료되면 상태를 업데이트합니다.
        axios.get(`/api/party/reply/${partyRegistrationId}`).then(resp => {
            setReplies(resp.data); // resp.data가 배열임을 가정합니다.
        }).catch(error => console.error("Error loading replies: ", error));
    }, [partyRegistrationId]); // partyRegistrationId가 변경될 때마다 API 호출

    // replies 상태가 업데이트되면 전체 댓글 목록을 업데이트합니다.
    useEffect(() => {
        const flattenedReplies = replies.flatMap(reply => [reply, ...reply.childrenPartyReplies]);
        const sortedReplies = flattenedReplies.sort((a, b) => new Date(a.writeDate) - new Date(b.writeDate));
        setAllReplies(sortedReplies);
    }, [replies]);


    // useEffect 내부에서 최상위 댓글 기반으로 페이지네이션 업데이트
    useEffect(() => {
        const indexOfLastReply = currentPage * repliesPerPage;
        const indexOfFirstReply = indexOfLastReply - repliesPerPage;
        const topLevelReplies = allReplies.filter(reply => !reply.parentPartyReply);
        setCurrentReplies(topLevelReplies.slice(indexOfFirstReply, indexOfLastReply));
    }, [currentPage, allReplies]);




    // 페이지 렌더링이 끝나고 난 뒤 loginId, partyRegistrationId 상태를 마운팅. 또한 선택된 Reply의 변경을 감지하여 세팅
    useEffect(() => {
        setSubmitReply(prev => ({
            ...prev,
            partyRegistrationId: partyRegistrationId,
            memberId: loginId,
            content: newReply,
            partyReplyParentId: selectedParentReply,
            partyReplyAdoptiveParentId: selectedAdoptiveParentReply
        }));
    }, [loginId, partyRegistrationId, selectedParentReply, selectedAdoptiveParentReply, newReply]);

    const handleCommentReply = () => {
        if(!isPartyEnd){
            const now = new Date();
            const formData = new FormData();
            formData.append("content", content);
            formData.append("writeDate", now.toISOString());
            formData.append("partyRegistrationId", submitReply.partyRegistrationId);
            formData.append("memberId", submitReply.memberId);
            formData.append("partyReplyParentId", submitReply.partyReplyParentId ? submitReply.partyReplyParentId.toString() : "0");
            formData.append("partyReplyAdoptiveParentId", submitReply.partyReplyAdoptiveParentId ? submitReply.partyReplyAdoptiveParentId.toString() : "0");
            formData.append("isSecret", isSecret); // 비밀댓글 여부 추가

            if (!content) {
                alert("댓글을 입력해주세요!");
                return;
            }
            axios.post("/api/party/reply", formData).then(resp => {
                // 서버로부터 받은 새로운 댓글 데이터
                const newReplyData = resp.data;

                // 새 대댓글이 추가될 부모 댓글 ID 확인
                const parentPartyReplyId = newReplyData.parentPartyReply.id;

                // 상태 업데이트
                setAllReplies(prevReplies => {
                    // 부모 댓글을 찾아 대댓글 목록 업데이트
                    return prevReplies.map(reply => {
                        if (reply.id === parentPartyReplyId) {
                            // 대댓글 목록에 새로운 대댓글 추가
                            const updatedChildrenPartyReplies = reply.childrenPartyReplies
                                ? [...reply.childrenPartyReplies, newReplyData]
                                : [newReplyData];
                            return { ...reply, childrenPartyReplies: updatedChildrenPartyReplies };
                        }
                        return reply;
                    });
                });

                setContent(""); // 입력 필드 초기화
                setNewReply(""); // 입력 필드 초기화
                setReplyingTo(null);
                setIsSecret(false);
            }).catch(error => {
                console.error("error : ", error);
                setNewReply(""); // 입력 필드 초기화
            });
        }
    }

    const handleSubmitReply = () => {

        // 글자 수가 1000자를 초과하는 경우 경고 메시지를 표시하고 제출하지 않음
        if (newReply.length > 1000) {
            alert("댓글은 1000자를 초과할 수 없습니다.");
            return;
        }
        const now = new Date();
        const formData = new FormData();
        formData.append("content", submitReply.content);
        formData.append("writeDate", now.toISOString());
        formData.append("partyRegistrationId", submitReply.partyRegistrationId);
        formData.append("memberId", submitReply.memberId);
        formData.append("partyReplyParentId", submitReply.partyReplyParentId ? submitReply.partyReplyParentId.toString() : "0");
        formData.append("partyReplyAdoptiveParentId", submitReply.partyReplyAdoptiveParentId ? submitReply.partyReplyAdoptiveParentId.toString() : "0");
        formData.append("isSecret", isSecret); // 비밀댓글 여부 추가

        if (!submitReply.content) {
            alert("댓글을 입력해주세요!");
            return;
        }
        axios.post("/api/party/reply", formData).then(response => {
            const newReplyData = response.data; // 서버로부터 받은 새 댓글 데이터
            setAllReplies(prevReplies => [...prevReplies, newReplyData]); // 댓글 목록에 새 댓글 추가
            setNewReply(""); // 입력 필드 초기화
            setIsSecret(false);
        }).catch(error => {
            console.error("error : ", error);
            setNewReply(""); // 입력 필드 초기화
        });

    };



    // 댓글 수정 로직 (부모 & 자식 댓글 포함)
    const handleEditReply = (replyId, updatedContent, parentPartyReplyId = null, updatedIsSecret = false) => {
        const formData = new URLSearchParams();
        formData.append('content', updatedContent);
        formData.append('isSecret', updatedIsSecret);
        if (!updatedContent) {
            alert("댓글을 입력해주세요!");
            return;
        }
        axios.put(`/api/party/reply/${replyId}`, formData)
            .then(response => {
                setAllReplies(prevReplies => prevReplies.map(reply => {
                    if (parentPartyReplyId && reply.id === parentPartyReplyId) {
                        // 부모 댓글 내에서 자식 댓글 업데이트
                        const updatedChildren = reply.childrenPartyReplies.map(childReply => {
                            if (childReply.id === replyId) {
                                return { ...childReply, content: updatedContent };
                            }
                            return childReply;
                        });
                        return { ...reply, childrenPartyReplies: updatedChildren };
                    } else if (reply.id === replyId) {
                        // 부모 댓글 직접 업데이트
                        return { ...reply, content: updatedContent };
                    }
                    return reply;
                }));
                setEditingReply(null); // 수정 완료 후 editingReply 상태 초기화
                setIsSecret(false);
            })
            .catch(error => console.error("Error updating reply: ", error));
    };

    // 자식 댓글 삭제 처리
    const handleDeleteChildReply = (replyId, parentPartyReplyId) => {
        setAllReplies(prevReplies => prevReplies.map(reply => {
            if (reply.id === parentPartyReplyId) {
                // 부모 댓글의 childrenPartyReplies 배열에서 삭제된 댓글 제거
                const updatedChildren = reply.childrenPartyReplies.filter(child => child.id !== replyId);
                return { ...reply, childrenPartyReplies: updatedChildren };
            }
            return reply;
        }));
    };

    // 삭제 로직
    const handleDeleteReply = (replyId, parentPartyReplyId = null, updatedIsSecret = false) => {
        if(!isPartyEnd){
            if (!window.confirm("이 댓글을 정말 삭제하시겠습니까?")) {
                return;
            }

            // 해당 댓글을 찾아 자식 댓글이 있는지 확인
            const replyToDelete = allReplies.find(reply => reply.id === replyId);
            const hasChildren = replyToDelete && replyToDelete.childrenPartyReplies && replyToDelete.childrenPartyReplies.length > 0;

            // 양부모 댓글로 참조되는지 확인
            const isAdoptiveParent = allReplies.some(reply => reply.partyReplyAdoptiveParentId === replyId);

            if (hasChildren || isAdoptiveParent) {
                const formData = new URLSearchParams();
                if (loginId === managerId) {
                    formData.append('content', "파티 관리자에 의해 지워진 댓글입니다");
                    formData.append('isSecret', false);
                }
                else {
                    formData.append('content', "사용자에 의해 지워진 댓글입니다");
                    formData.append('isSecret', false);
                }

                axios.put(`/api/party/reply/${replyId}`, formData)
                    .then(response => {
                        setAllReplies(prevReplies => prevReplies.map(reply => {
                            if (reply.id === replyId) {
                                if (loginId === managerId) {
                                    return { ...reply, content: "파티 관리자에 의해 지워진 댓글입니다", isSecret: false };
                                }
                                else {
                                    return { ...reply, content: "사용자에 의해 지워진 댓글입니다", isSecret: false };
                                }

                            }
                            return reply;
                        }));
                    })
                    .catch(error => console.error("Error updating reply: ", error));
            } else {
                // 자식 댓글이 없고 양부모 댓글로 참조되지 않는 경우, 댓글 삭제
                axios.delete(`/api/party/reply/${replyId}`)
                    .then(response => {
                        if (parentPartyReplyId) {
                            // 자식 댓글 삭제 처리
                            handleDeleteChildReply(replyId, parentPartyReplyId);
                        } else {
                            // 최상위 댓글 삭제 처리
                            setAllReplies(prevReplies => prevReplies.filter(reply => reply.id !== replyId));
                        }
                    })
                    .catch(error => console.error("Error deleting reply: ", error));
            }
        }
    };

    if (!replies) {
        return (
            <LoadingSpinner />
        )
    }


    return (
        <div className={styles.reply__section}>
            <hr />
            {allReplies.length > 0 ? (
                <>
                    <RenderReplies
                        content={content}
                        setContent={setContent}
                        replies={currentReplies}
                        allReplies={allReplies}
                        setSelectedParentReply={setSelectedParentReply}
                        setSelectedAdoptiveParentReply={setSelectedAdoptiveParentReply}
                        replyingTo={replyingTo}
                        setReplyingTo={setReplyingTo}
                        handleCancelReplyClick={handleCancelReplyClick}
                        handleCommentReply={handleCommentReply}
                        selectedParentReply={selectedParentReply}
                        selectedAdoptiveParentReply={selectedAdoptiveParentReply}
                        // 댓글 수정 관련 props
                        editingReply={editingReply}
                        setEditingReply={setEditingReply}
                        handleEditButtonClick={handleEditButtonClick}
                        handleEditReply={handleEditReply}
                        // 댓글 삭제 props
                        handleDeleteReply={handleDeleteReply}
                        // 비밀댓글 여부
                        isSecret={isSecret}
                        setIsSecret={setIsSecret}
                        // 파티 관리자 id
                        managerId={managerId}
                        isPartyEnd={isPartyEnd}
                    />

                    {/* 페이지네이션 */}
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={repliesPerPage}
                        totalItemsCount={allReplies.filter(reply => !reply.parentPartyReply).length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />

                </>
            ) : (
                <div className={styles.noReplies}>댓글이 없습니다</div>
            )}
            <hr />
            <div className={styles.replyForm}>
                <textarea
                    className={styles.replyInput}
                    value={newReply}
                    onChange={handleReplyChange}
                    placeholder="댓글을 작성하세요"
                    onClick={handleCancelReplyClick}
                    disabled={isPartyEnd}
                />
                <div className={styles.checkForm}>
                    <div className={styles.secretCheckboxContainer}>
                        <input
                            type="checkbox"
                            checked={isSecret}
                            disabled={isPartyEnd}
                            onChange={(e) => setIsSecret(e.target.checked)}
                        />
                        <label className={styles.secretCheckboxLabel}>
                            비밀댓글
                        </label>
                    </div>
                    <div className={styles.replyCounter}>
                        댓글 글자 수 : {newReply.length}/1000
                    </div>
                </div>

                <button onClick={isPartyEnd?()=>{}:handleSubmitReply} className={styles.replyButton}>댓글 작성</button>
            </div>
        </div>
    );

};

export default PartyReply;
