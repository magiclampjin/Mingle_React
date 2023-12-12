import style from '../../components/MypageHam/MypageHam.module.css';

const MypageHam = () =>{
    // 메뉴 초기값 false
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // on,off 개념 state
    const toggleMenu = () =>{
        setIsMenuOpen((prev)=>!prev);
    }

    return(
       <div className={style.container}>

        

       </div>
    );
}

export default MypageHam;