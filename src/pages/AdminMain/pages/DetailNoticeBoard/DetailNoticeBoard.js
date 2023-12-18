import style from "../../AdminMain.module.css";
import FixedNotice from "./components/FixedNotice/FixedNotice";
import WroteNotice from "./components/WroteNotice/WroteNotice";

const DetailNoticeBoard = () => {
    return (
        <div className={style.background}>
            <div className={style.body}>
                <FixedNotice></FixedNotice>
                <WroteNotice></WroteNotice>
            </div>
        </div>
    );
}

export default DetailNoticeBoard;