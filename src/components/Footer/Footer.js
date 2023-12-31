import style from "./Footer.module.css";

const Footer = () => {
  // 자주 묻는 질문으로 이동
  const handleFAQClick = () => {
    window.open('https://impossible-log-6dc.notion.site/4ac5ec788ca04f6ab7304dbb71891974?pvs=4');
  }

  return (
    <div className={style.footer}>
      <div className={style.footer__guide}>
        <div className={style.footer__logo}>
          M<span>I</span>NG<span>L</span>E
        </div>
        <div className={style.footer__menu}>
          <div className={style.footer__navi}>
            <div className={style.navi__conf}>개인정보처리방침</div>
            <div className={style.navi__conf}>서비스 이용약관</div>
            <div className={style.navi__conf} onClick={handleFAQClick}>FAQ</div>
          </div>
          <div className={style.footer__info}>
            <div className={style.info__conf}>
              <div>팀명 : Mangle</div>
              <div>팀장 : 이윤진</div>
            </div>
            <div className={style.info__conf}>
              <div>
                주소 : 충청남도 천안시 서북구 천안대로 1223-24 공주대학교
                천안캠퍼스
              </div>
            </div>
            <div className={style.info__conf}>
              <div>이메일 : eyungenius@gmail.com</div>
              <div>
                git :{" "}
                <a href="https://github.com/magiclampjin" target="_blank">
                  https://github.com/magiclampjin
                </a>
              </div>
            </div>
            <div className={style.copyright}>
              Copyright © 2023 Mangle Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
