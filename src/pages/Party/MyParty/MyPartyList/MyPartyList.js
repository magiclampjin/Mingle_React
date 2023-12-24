import style from "./MyPartyList.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const MyPartyList = () => {
    const [myPartyList, setMyPartyList] = useState();

    // useEffect(()=>{
    //     axios.get("/api/party/getMyPartyList").then(resp=>{
    //         setMyPartyList(resp.data);
    //     })
    // },[]);

    return(
        <div className={style.body}>
            <div className={style.title}>
                나의 파티    
            </div>
            <div className={style.partyList}>
                <div className={style.myParty}>
                    구현 예정입니다...
                </div>
            </div>
        </div>
    );
}

export default MyPartyList;

/*


 <div className={`${style.partyListLine} ${style.centerAlign}`}>
{   
    isServiceListLoading ? (
        <LoadingSpinnerMini height={260} width={100}/>
    ) :(
        service.map((e,i)=>{                         
            return(
                <>
                    <div key={i} data-id={e.id} className={`${style.partyContent}`} onClick={openModal}>
                        <div className={`${style.partyContent__img} ${style.centerAlign}`}><img src={`/assets/serviceLogo/${e.englishName}.png`} alt={`${e.name} 로고 이미지`}></img></div>
                        <div className={`${style.partyContent__name} ${style.centerAlign}`}>{e.name}</div>
                        <div className={`${style.partyContent__txt} ${style.centerAlign}`}>매달 적립!</div>
                        <div className={`${style.centerAlign}`}>
                            <div className={`${style.maxPrice} ${style.centerAlign}`}>~{formatNumber(Math.ceil((e.price)/(e.maxPeopleCount))*(e.maxPeopleCount-1)-(e.commission)*(e.maxPeopleCount-1))}원</div>
                            <div className={`${style.hotTag} ${style.centerAlign}`}><FontAwesomeIcon icon={faStar} size="1x"/><div className={`${style.hatTagTxt}`}>HOT</div></div>
                        </div>
                    </div>
                </>
            ); 
        })  
    )                 
}


*/