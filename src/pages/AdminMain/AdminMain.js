// import style from "./AdminMain.module.css"
import { Routes, Route } from "react-router-dom";
// import MemberManageBox from './components/MemberManageBox/MemberManageBox';
// import NoticeBoardBox from './components/NoticeBoardBox/NoticeBoardBox';
// import StatisticsBox from "./components/StatisticsBox/StatisticsBox";
import AdminIndex from "./AdminIndex/AdminIndex";
import ReportReadForm from "./pages/ReportReadForm/ReportReadForm";
import DetailMemberManage from "./pages/DetailMemberManage/DetailMemberManage";
import DetailReportParty from "./pages/DetailMemberManage/pages/DetailReportParty/DetailReportParty";

const AdminMain = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={<AdminIndex />}/>
            <Route path="/ReportReadForm" element={<ReportReadForm />}/>
              <Route path="/DetailMemberManage" element={<DetailMemberManage />}/>
              <Route path="/DetailMemberManage/DetailReportParty" element={<DetailReportParty />}/>
        </Routes>

        {/* <div className={style.background}>
            <div className={style.body}>
                <MemberManageBox></MemberManageBox>r®
                <NoticeBoardBox></NoticeBoardBox>
                <StatisticsBox></StatisticsBox>
            </div>
        </div> */}
        </>
    );
}

export default AdminMain;