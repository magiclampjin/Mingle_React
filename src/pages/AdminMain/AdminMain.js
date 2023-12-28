import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../App";
import AdminIndex from "./AdminIndex/AdminIndex";
import ReportReadForm from "./pages/ReportReadForm/ReportReadForm";
import DetailMemberManage from "./pages/DetailMemberManage/DetailMemberManage";
import DetailNoticeBoard from "./pages/DetailNoticeBoard/DetailNoticeBoard";
import DetailReportParty from "./pages/DetailMemberManage/pages/DetailReportParty/DetailReportParty";

const AdminMain = () => {
  // 선택된 메뉴 초기화
  const { setSelectedMenu } = useContext(MenuContext);
  useEffect(() => {
    setSelectedMenu("");
  }, []);
  return (
    <Routes>
      <Route path="/" element={<AdminIndex />} />
      <Route path="/ReportReadForm" element={<ReportReadForm />} />
      <Route path="/DetailMemberManage" element={<DetailMemberManage />} />
      <Route path="/DetailNoticeBoard" element={<DetailNoticeBoard />}></Route>
      <Route
        path="/DetailMemberManage/DetailReportParty"
        element={<DetailReportParty />}
      />
    </Routes>
  );
};

export default AdminMain;
