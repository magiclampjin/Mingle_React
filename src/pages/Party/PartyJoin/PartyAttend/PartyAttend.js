import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./PartyAttend.module.css";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PartyAttend = () => {
    const navi = useNavigate();

    const handleBack = () => {
        navi(-1);
    }

    return(
        <div className={style.body}>
            <div className={style.VAlign}>
                <FontAwesomeIcon icon={faCircleArrowLeft} onClick={handleBack} className={style.backIcon}/> 
                <div className={style.bigTitle}>파티 가입하기</div>
            </div>
        </div>
    );
}

export default PartyAttend;