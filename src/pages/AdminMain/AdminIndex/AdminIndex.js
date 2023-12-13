import style from "../AdminMain.module.css"

import MemberManageBox from '../components/MemberManageBox/MemberManageBox';
import NoticeBoardBox from '../components/NoticeBoardBox/NoticeBoardBox';
import StatisticsBox from "../components/StatisticsBox/StatisticsBox";

const AdminIndex = () => {
    return (
        <div className={style.background}>
            <div className={style.body}>
                <MemberManageBox></MemberManageBox>
                <NoticeBoardBox></NoticeBoardBox>
                <StatisticsBox></StatisticsBox>
            </div>
        </div>
    );
}

export default AdminIndex;