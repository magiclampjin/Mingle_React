import style from "./PartyCreate.module.css"

let PartyCreate = () => {
    return (
        <>
            <div className={`${style.partyName}`}>어떤 파티를 만드시겠어요?</div>
            <div className={`${style.partyCategoryList} ${style.dflex}`}>
                <div className={`${style.partyCategory}`}>전체</div>
                <div className={`${style.partyCategory}`}>미디어</div>
                <div className={`${style.partyCategory}`}>통신</div>
                <div className={`${style.partyCategory}`}>등등불러오기</div>
            </div>
            <div className={`${style.partyList}`}>
                <div className={`${style.partyContent }`}></div>
            </div>
        </>
    );
}

export default PartyCreate;