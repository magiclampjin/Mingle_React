import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// 댓글 관리를 위한 컨텍스트 생성
const ReplyContext = createContext();

// Provider 컴포넌트
export const ReplyProvider = ({ children }) => {
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [allReplies, setAllReplies] = useState([]); // 댓글 목록 상태

    const activateEditReplyMode = (replyId) => {
        setEditingReplyId(replyId);
    };

    const cancelEditReply = () => {
        setEditingReplyId(null);
    };

    // 댓글 수정 로직 (부모 & 자식 댓글 포함)
    const handleEditReply = (replyId, updatedContent, parentReplyId = null) => {
        axios.put(`/api/reply/${replyId}`, { content: updatedContent })
            .then(response => {
                setAllReplies(prevReplies => prevReplies.map(reply => {
                    if (parentReplyId && reply.id === parentReplyId) {
                        // 부모 댓글 내에서 자식 댓글 업데이트
                        const updatedChildren = reply.childrenReplies.map(childReply => {
                            if (childReply.id === replyId) {
                                return { ...childReply, content: updatedContent };
                            }
                            return childReply;
                        });
                        return { ...reply, childrenReplies: updatedChildren };
                    } else if (reply.id === replyId) {
                        // 부모 댓글 직접 업데이트
                        return { ...reply, content: updatedContent };
                    }
                    return reply;
                }));
            })
            .catch(error => console.error("Error updating reply: ", error));
    };


    // 삭제 로직
    const handleDeleteReply = (replyId, hasChildren) => {
        if (hasChildren) {
            // 자식 댓글이 있을 경우, 내용만 업데이트
            axios.put(`/api/reply/${replyId}`, { content: "사용자에 의해 지워진 댓글입니다" })
                .then(response => {
                    setAllReplies(prevReplies => prevReplies.map(reply => {
                        if (reply.id === replyId) {
                            return { ...reply, content: "사용자에 의해 지워진 댓글입니다" };
                        }
                        return reply;
                    }));
                })
                .catch(error => console.error("Error updating reply: ", error));
        } else {
            // 자식 댓글이 없을 경우, 댓글 삭제
            axios.delete(`/api/reply/${replyId}`)
                .then(response => {
                    setAllReplies(prevReplies => prevReplies.filter(reply => reply.id !== replyId));
                })
                .catch(error => console.error("Error deleting reply: ", error));
        }
    };


    return (
        <ReplyContext.Provider value={{  allReplies, setAllReplies, editingReplyId, activateEditReplyMode, cancelEditReply, handleEditReply, handleDeleteReply }}>
            {children}
        </ReplyContext.Provider>
    );
};

// 컨텍스트 사용을 위한 훅
export const useReplyContext = () => useContext(ReplyContext);
