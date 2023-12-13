import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './Board.module.css'
import axios from 'axios';
import BoardCategories from './components/BoardCategory/BoardCategories';
import RenderTable from './components/RenderTable/RenderTable';

export const postMenuContext = createContext();

const Board = () => {

    const [menu, setMenu] = useState("");
    
    

    return (
        <postMenuContext.Provider value={{menu,setMenu}}>
            <div className={styles.container}>
                <div>
                    <BoardCategories/>
                </div>


            </div>
        </postMenuContext.Provider>
        
    );
};

export default Board;
