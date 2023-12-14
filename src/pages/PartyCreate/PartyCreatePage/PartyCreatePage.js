import style from "./PartyCreatePage.module.css";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import PurpleRectangleBtn from "../../../components/PurpleRectangleBtn/PurpleRectangleBtn";

const PartyCreatePage = () =>{
    const location = useLocation();
    const service = location.state.service;
    // 비밀번호 보기 여부
    const [isView,setView] = useState(false);
    // 비밀번호 일치 여부
    const [isSame,setSame] = useState(false);
    // input tag focus 여부
    // const [isFocus,setFocus] = useState({id:false, pw:false, pwConfirm:false});
    // 입력한 계정 정보
    const [accountInfo, setAccountInfo] = useState({id:"", pw:"", pwConfirm:""});
    // 다음 단계 넘어갈 수 있는 지 판단
    const [isChked, setChecked] = useState({id:false, pw:false});

    // 입력한 아이디 state에 저장
    const handleChangeId = (e) => {
        setChecked((prev)=>({...prev,id:true}))
        setAccountInfo((prev)=>{
            if(e.target.value!==""){setChecked((prev)=>({...prev,id:true}))}
            return {...prev,id:e.target.value}
        });
    }

    // 비밀번호 or 비밀번호 확인 입력
    const handleChangePW = (e) => {
        const {name, value} = e.target;
        setChecked((prev)=>({...prev,pw:false}))
        setAccountInfo((prev)=>{
            
            // 비밀번호 일치여부 검사
            let compartTargetName = "pw";
            if(name === "pw") compartTargetName = "pwConfirm";
            if(accountInfo[compartTargetName] === value) {setSame(true); if(value!==""){setChecked((prev)=>({...prev,pw:true}))}}
            else setSame(false);    

            // 입력한 비밀번호 state에 저장
            return {...prev,[name]:value}
        });
    };

    // 비밀번호 보기
    const handleView = (e) =>{
        const partyContentElement = e.currentTarget;
        const clickedElement = e.target; 
        if (clickedElement === partyContentElement || partyContentElement.contains(clickedElement)) {
            // partyContent 또는 그 자식 요소를 클릭한 경우에만 처리
            setView(prev=>!prev);
        }        
    }

    // 다음 버튼 클릭
    const handleNext = (e) =>{
        if(isChked.id&&isChked.pw){
            console.log("다음");
        }
    }

    return(
        <div className={`${style.body} ${style.dflex}`}>
            <div className={style.left}>
                <div className={style.stepBox}>
                    스텝
                </div>
            </div>
            <div className={style.right}>
                <div className={style.title}>{service.name} {service.plan}의<br></br>로그인 정보를 입력해주세요.</div>
                <div className={style.inputTags}>
                    <div className={style.inputTag}><div className={style.inputCover}><div className={`${accountInfo.id===""?`${style.inputTitle} ${style.inputTitleHidden}`:`${style.inputTitle}`}`}>아이디</div><input type="text"  className={`${accountInfo.id===""?null:`${style.hasContent}`}`} name="id" placeholder="아이디" onChange={handleChangeId}></input></div></div>
                    <div className={style.inputTag}><div className={style.inputCover}><div className={`${accountInfo.pw===""?`${style.inputTitle} ${style.inputTitleHidden}`:`${style.inputTitle}`}`}>비밀번호</div><input type={`${isView?"text":"password"}`} className={`${accountInfo.pw===""?null:`${style.hasContent}`}`} name="pw" placeholder="비밀번호" onChange={handleChangePW}></input></div><div className={`${style.iconCover} ${style.centerAlign}`}><FontAwesomeIcon icon={faEye} size="sm" className={`${isView?`${style.eyeIconActive} ${style.eyeIcon}`:`${style.eyeIcon}`}`} onClick={handleView} data-name="pw"/></div></div>
                    <div className={style.inputTag}><div className={style.inputCover}><div className={`${accountInfo.pwConfirm===""?`${style.inputTitle} ${style.inputTitleHidden}`:`${style.inputTitle}`}`}>비밀번호 확인</div><input type={`${isView?"text":"password"}`} className={`${accountInfo.pwConfirm===""?null:`${style.hasContent}`}`} name="pwConfirm" placeholder="비밀번호 확인" onChange={handleChangePW}></input></div><div className={`${style.iconCover} ${style.centerAlign}`}><FontAwesomeIcon icon={faEye} size="sm" className={`${isView?`${style.eyeIconActive} ${style.eyeIcon}`:`${style.eyeIcon}`}`} onClick={handleView} data-name="pwConfirm"/></div></div>
                </div>
                <div className={style.pwCheck}>
                    {`${isSame===false && accountInfo.pwConfirm !=="" && accountInfo.pw!=="" ? "비밀번호가 일치하지 않습니다.":""}`}
                </div>
                <div className={`${style.inputNotice}`}><FontAwesomeIcon icon={faTriangleExclamation} size="xs"/><div className={style.inputNoticeTxt}>입력하신 계정은 유효성 검증에 사용되며, 파티를 만들고 난 뒤 정보를 변경할 수 없으니 주의해주세요.</div></div>
                <div className={style.nextBtn}><PurpleRectangleBtn title="다음" activation={isChked.id&&isChked.pw} onClick={handleNext} width={150} heightPadding={10}/></div>
                <div className={style.goService}><a href={service.url} target="_blank" rel="noopener noreferrer">{service.name} 바로가기</a></div>
            </div>
        </div>
    );
}

export default PartyCreatePage;