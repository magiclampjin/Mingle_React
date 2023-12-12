import style from "./PartyCreateList.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const partyContent = () => {
    return (
        <div key={i} className={`${style.partyContent}`}>
            <div className={`${style.partyContent__img} ${style.centerAlign}`}><img src="/assets/serviceLogo/netflix.png"></img></div>
            <div className={`${style.partyContent__name} ${style.centerAlign}`}>${e.name}</div>
            <div className={`${style.partyContent__txt} ${style.centerAlign}`}>매달 적립!</div>
            <div className={`${style.centerAlign}`}>
                <div className={`${style.maxPrice} ${style.centerAlign}`}>~${e.price}</div>
                <div className={`${style.hotTag} ${style.centerAlign}`}><FontAwesomeIcon icon={faStar} size="1x"/><div className={`${style.hatTagTxt}`}>HOT</div></div>
            </div>
        </div>   
    );
}

export default PartyContent;