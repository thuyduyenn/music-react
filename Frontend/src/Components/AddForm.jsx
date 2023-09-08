import {useContext} from "react"
import { AuthContext } from "../context/AuthContext";
import {TbArrowBack} from "react-icons/tb"
const AddForm = () => {
    const {flatAddMusic,handleChangeFlatAddMusic,handleChangeListInfo,handlePressAdd,addLoading,listInfo} = useContext(AuthContext)
   
    const handleImageChange = (e) => {
      
        const file = e.target.files[0]
        TransformFile(file)
  }
  const handleVideoChange = (e) => {
       const file = e.target.files[0]
       TransformFileVideo(file)
  }
  const TransformFile = (file) => {
    const reader = new FileReader();
    if(file){
         reader.readAsDataURL(file)
         reader.onloadend = () => {
               handleChangeListInfo({
                   ...listInfo,
                   image:reader.result
               })
         }
    }
}
const TransformFileVideo = (file) => {
    const reader = new FileReader();
    if(file){
         reader.readAsDataURL(file)
         reader.onloadend = () => {
               handleChangeListInfo({
                   ...listInfo,
                   video:reader.result
               })
         }
    }
}

    return ( 
        <div className="form" style={{
            display:flatAddMusic ? "flex" : "none"
        }}>
              <div className="comeback-icon" onClick={()=>handleChangeFlatAddMusic()}><TbArrowBack/></div>
              <form>
                   <h1>Add now</h1>
                  <input type="text" placeholder="enter your song....." onChange={(e)=> handleChangeListInfo({
                      ...listInfo,
                      name:e.target.value
                  })} value={listInfo.name}></input>
                  <input type="text" placeholder="enter name of singer" onChange={(e)=> handleChangeListInfo({
                      ...listInfo,
                      singer:e.target.value
                  })} value={listInfo.singer}></input>
                  <input type="file" accept="/image" onChange={handleImageChange}></input>
                  <input type="file" accept="video/mp4,video/x-m4v,video/*" onChange={handleVideoChange} ></input>       
             </form>
             <div className="button" onClick={()=>handlePressAdd()}><button>{addLoading ? (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>): "Add music"}</button></div>
        </div>
     );
}
 
export default AddForm;