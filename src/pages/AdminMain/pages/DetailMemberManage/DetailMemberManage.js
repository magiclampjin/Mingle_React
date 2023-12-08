import style from './DetailMemberManage.module.css';
import ReportPost from "./components/ReportPost/ReportPost";
import ReportReply from './components/ReportReply/ReportReply';

const DetailMemberManage = () => {
    return (
        <div className={style.body}>
            <ReportPost></ReportPost>
            <ReportReply></ReportReply>
        </div>
    );
}

export default DetailMemberManage;