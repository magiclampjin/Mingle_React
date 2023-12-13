import Modal from "react-modal";
import { useState, useEffect } from "react";

Modal.setAppElement("#root");

const ProfileModal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  const [topPosition, setTopPosition] = useState("70px");
  useEffect(() => {
    const handleResize = () => {
      // 창의 너비에 따라 top 속성 동적으로 변경
      if (window.innerWidth < 870) {
        setTopPosition("80px");
      } else {
        setTopPosition("70px");
      }
    };

    // 처음 컴포넌트가 마운트될 때 한 번 실행
    handleResize();

    // 창 크기가 변경될 때마다 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          maxWidth: 1300 + "px",
          margin: "auto",
        },
        content: {
          top: topPosition,
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
