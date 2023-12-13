import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const MypageModal = ({ isOpen, onRequestClose, contentLabel, children, width, height }) => {
  // isOpen: 모달의 열림 상태
  // onRequestClose: 모달 닫기 요청 콜백
  // contentLabel: 접근성을 위한 레이블
  // children: 모달 내부에 렌더링할 요소

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: width+"px",
          height: height + "px",
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          // width: '60%', // 모달의 가로 크기
          // height: '80%', // 모달의 세로 크기
          // maxWidth: '500px', // 최대 가로 크기
          // maxHeight: '300px', // 최대 세로 크기
          overflow: 'auto' // 내용이 넘칠 경우 스크롤
        }
      }}
    >
      {children}
    </Modal>
  );
};

export default MypageModal;
