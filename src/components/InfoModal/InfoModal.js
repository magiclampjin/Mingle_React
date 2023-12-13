import React, { useState } from 'react';
import CustomModal from '../CustomModal/CustomModal';

const InfoModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>정보 보기</button>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="정보 모달"
      >
        <h2>정보 모달</h2>
        <div>여기에 필요한 정보를 표시합니다.</div>
        <button onClick={closeModal}>닫기</button>
      </CustomModal>
    </div>
  );
};

export default InfoModal;
