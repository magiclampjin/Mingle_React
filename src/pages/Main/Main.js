import GrayRectangleBtn from "../../components/GrayRectangleBtn/GrayRectangleBtn";
import PurpleRectangleBtn from "../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import PurpleRoundBtn from "../../components/PurpleRoundBtn/PurpleRoundBtn";
import WhiteRectangleBtn from "../../components/WhiteRectangleBtn/WhiteRectangleBtn";
import WhiteRoundBtn from "../../components/WhiteRoundBtn/WhiteRoundBtn";

import { useState, useEffect } from 'react';
import style from "./Main.module.css"

function Main(){
    return(
        <>
            <div className={`${style.mainDiv}`}>버튼 component 사용법은 /pages/Main/Main.js 에서 확인하세요 !! 파란색 영역이 추후에 Main으로 변경될 영역입니다<br></br><br></br>
                <GrayRectangleBtn
                title={"gray"}
                width={120}
                heightPadding={20}
                ></GrayRectangleBtn>
                <PurpleRoundBtn title={"test"} activation={true}></PurpleRoundBtn>
                <PurpleRoundBtn title={"test"} activation={false}></PurpleRoundBtn>
                <PurpleRectangleBtn
                title={"test"}
                width={150}
                heightPadding={10}
                ></PurpleRectangleBtn>
                <WhiteRectangleBtn title={"wersdfgfrec"}></WhiteRectangleBtn>
                <WhiteRoundBtn title={"white"}></WhiteRoundBtn>
            </div>
        </>
    );
}

export default Main;