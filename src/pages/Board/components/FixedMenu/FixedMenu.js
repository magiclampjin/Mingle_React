import React, { useState } from 'react';
import styles from './FixedMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FixedMenu = () => {

    return (
        <div className={styles.fixedMenu}>

            <Link to="/board/writepost">
                <button className={`${styles.menuItem} menuItem`}> <FontAwesomeIcon icon={faPen} />&nbsp;게시글 작성</button>
            </Link>


        </div>
    );
};

export default FixedMenu;
