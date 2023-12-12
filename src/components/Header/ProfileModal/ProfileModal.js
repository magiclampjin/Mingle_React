import Modal from "react-modal";

Modal.setAppElement("#root");

const ProfileModal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.0)",
        },
        content: {
          top: "70px",
          left: "auto",
          right: "16px",
          bottom: "auto",
          width: "280px", // 모달의 가로 크기
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default ProfileModal;
