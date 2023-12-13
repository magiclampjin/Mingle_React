import style from "./ServiceCategoryNavi.module.css"
import axios from "axios";

const ServiceCategoryNavi = ({id,isSelected,setSelectServiceCategory, service, setService, setServiceListLoading}) => {

    const handleSelectCategory = (e) => {
        setServiceListLoading(true);
        setSelectServiceCategory(e.target.innerText);

        axios.get(`/api/party/getService/${e.target.innerText}`).then(resp=>{
            setService(Array.isArray(resp.data)? resp.data : []);
            setServiceListLoading(false);
        }).catch(()=>{
            setServiceListLoading(false);
            setService([]);
        })
    };

    const CategoryStyle = {
        borderBottom : isSelected == 1 ? "3px solid black" : "",
        color: isSelected == 1 ? "black" : "#737577"
    };

    return (
        <div className={`${style.partyCategory}`} onClick={handleSelectCategory} style={CategoryStyle}>{id}</div>
    );
}

export default ServiceCategoryNavi;