
import WhiteRectangleBtn from '../../../../components/WhiteRectangleBtn/WhiteRectangleBtn';
import style from '../MypageSidebarRight/MypageSidebarRight.module.css';

const MypageSidebarRight = () =>{

    const withdrawBtn = {
        fontSize : '14px'
    };

    return(
        <div className={style.moneyBox}>
            <div>
                <div className={style.money__inner}>나의 밍글 머니</div>
                <div className={style.money__inner}>0원</div>
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