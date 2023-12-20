
import axios from 'axios';
import WhiteRectangleBtn from '../../../../components/WhiteRectangleBtn/WhiteRectangleBtn';
import style from '../MypageSidebarRight/MypageSidebarRight.module.css';
import { useState } from 'react';

const MypageSidebarRight = () =>{

    // 밍글머니 State
    const [mingleMoney, setMingleMoney] = useState("");

    axios.get("/api/member/getMingleMoney").then((resp) => {
        // 성공적으로 처리된 경우의 로직
        console.log(resp.data);
        setMingleMoney(resp.data);
    })
    .catch((error) => {
        // 오류 발생 시의 처리 로직
        console.error(error);
        alert("밍글머니를 불러오는데 실패했습니다.");
    });

    // 숫자를 천 단위로 콤마 찍어주는 함수
    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const withdrawBtn = {
        fontSize : '14px'
    };

    return(
        <div className={style.moneyBox}>
            <div>
                <div className={style.money__inner}>나의 밍글 머니</div>
                <div className={style.money__inner}>{formatNumber(mingleMoney)} 원</div>
                <div className={style.money__inner}></div>
                <div className={style.money__inner}>
                    <WhiteRectangleBtn 
                    style={withdrawBtn}
                    width={170} 
                    heightPadding={10} 
                    title={"인출하기"}
                    ></WhiteRectangleBtn>
                </div>
            </div>
        </div>

    );
}

export default MypageSidebarRight;