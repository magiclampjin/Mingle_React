import axios from "axios";
import { useEffect, useState } from "react";
import RenderVideo from "../components/RenderVideo/RenderVideo";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";


const Intro = () => {
    const [newVideoInfo, setNewVideoInfo] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get("/api/external/youtube/selectAll").then(resp => {
            setNewVideoInfo(resp.data);
            setLoading(false);
        })

    },[])

    if(loading){
        return(
            <LoadingSpinner></LoadingSpinner>
        )
    }
    
    return(
        <div>
            <RenderVideo newVideoInfo={newVideoInfo}/>
        </div>
    )

}

export default Intro;