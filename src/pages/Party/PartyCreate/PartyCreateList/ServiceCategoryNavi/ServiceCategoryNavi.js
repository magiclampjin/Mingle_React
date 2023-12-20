import style from "./ServiceCategoryNavi.module.css"
import axios from "axios";

const ServiceCategoryNavi = ({id,isSelected,setSelectServiceCategory, setJoinService, setService, setServiceListLoading}) => {

    const handleSelectCategory = (e) => {
        setServiceListLoading(true);
        setSelectServiceCategory(e.target.innerText);

        axios.get(`/api/party/getService/${e.target.innerText}`).then(resp=>{
            setService(Array.isArray(resp.data.list)? resp.data.list : []);
            let joinArr = Array.isArray(resp.data.joinList)?resp.data.joinList : [];
            if(joinArr.length>0){
                joinArr.sort();
                setJoinService(joinArr);
            }
            setServiceListLoading(false);
        }).catch(()=>{
            setServiceListLoading(false);
            setService([]);
        })
    };

    const CategoryStyle = {
        borderBottom : isSelected === true ? "3px solid black" : "",
        color: isSelected === true ? "black" : "#737577"
    };

    return (
        <div className={`${style.partyCategory}`} onClick={handleSelectCategory} style={CategoryStyle}>{id}</div>
    );
}

export default ServiceCategoryNavi;