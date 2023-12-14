// FixedMenu.js
import React from 'react';
import styles from './FixedMenu.module.css'; // 해당 컴포넌트의 스타일 시트

const FixedMenu = () => {
    return (
        <div className={styles.fixedMenu}>
            {/* 메뉴 아이템들을 여기에 추가 */}
            <button>메뉴 1</button>
            <button>메뉴 2</button>
            {/* 추가적인 메뉴 아이템이 있다면 계속 추가 */}
        </div>
    );
};

export default FixedMenu;
