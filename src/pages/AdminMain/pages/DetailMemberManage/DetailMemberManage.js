import style from '../../AdminMain.module.css';
import ReportPost from "./components/ReportPost/ReportPost";
import ReportReply from './components/ReportReply/ReportReply';
import ReportParty from './components/ReportParty/ReportParty';

const DetailMemberManage = () => {
    return (
        <div className={style.background}>
            <div className={style.body}>
                <ReportPost></ReportPost>
                <ReportReply></ReportReply>
                <ReportParty></ReportParty>
            </div>
        </div>
    );
}

export default DetailMemberManage;