import {BsFillPlayFill,BsFillPlusSquareFill,BsFillPauseFill} from "react-icons/bs"
import {MdOutlineKeyboardDoubleArrowRight,MdOutlineKeyboardDoubleArrowLeft} from "react-icons/md"
import {BiShuffle} from "react-icons/bi"
import {GiMusicalNotes} from "react-icons/gi"
import {HiChevronDown} from "react-icons/hi"
import { FiRepeat } from "react-icons/fi"
import {FaTimes} from "react-icons/fa"
import { CgPushChevronRight } from "react-icons/cg"
import { AuthContext } from "../context/AuthContext"
import { useContext, useEffect,useCallback,useState } from "react"

const MainScreen = () => {
    const {flatAddMusic,handleChangeFlatAddMusic,indexMusic,handleChangeIndex,allListMusic,targetMusic,statusMusic,  prevMusic, nextMusic, PauseMusic, PlayMusic,mainAudioEnded,handleDispatch,state,handleTimeUpdate,showMusicList,handleShowMusicList,handleClickItem} = useContext(AuthContext)
    return ( 
    <div className="wrapper" style={{
        display: flatAddMusic ? "none" : "block"
  }}>
    <div className="top-bar">
        {/* <i className='bx bx-chevron-down'><HiChevronDown/></i> */}
          <span>Now playing</span>
        <i className='bx bx-dots-horizontal-rounded' onClick={()=>handleChangeFlatAddMusic()}><BsFillPlusSquareFill/></i>
    </div>
    <div className="img-area">
         <img src={targetMusic?.image.url} alt=""/>
    </div>
    <div className="song-details">
          <p className="name">{targetMusic?.name} </p>
          <p className="artist">{targetMusic?.singer} </p>
    </div>
    <div className="progress-area">
         <div className="progress-bar">
          
         </div>
         <div className="timer">
            <span className="current">0:00</span>
            <span className="duration"></span>
         </div>
         {
            allListMusic?.map((item,index)=> {
                 if(index === indexMusic){
                    return (
                        <audio controls id="main-audio" key={index}  style={{
                                display:"none"
                        }} onEnded={()=>mainAudioEnded()} onTimeUpdate={(e)=> handleTimeUpdate(e)}>
                              <source  src={item.video.url} type="audio/mp4"/>           
                       </audio>
                    )
                 }
            })
         }

                  
            
           
                  
            
         
      
    

    </div>

    <div className="controls">
          <i className='bx bx-shuffle material-icons' id="repeat-plist">
            {
                  state.type === "repeat" && <CgPushChevronRight  onClick={()=> handleDispatch({type:"repeat"})}/> || state.type === "repeat-one" && <FiRepeat onClick={()=> handleDispatch({type:"repeat-one"})}/> || state.type === "shuffle" && <BiShuffle onClick={()=> handleDispatch({type:"shuffle"})}/>
            }
          </i>
          <i className='bx bxs-chevrons-left material-icons' id="prev" onClick={()=>prevMusic()}><MdOutlineKeyboardDoubleArrowLeft/></i>
          <div className="play-pause" onClick={()=> statusMusic ? PauseMusic() : PlayMusic() }>
                <i className='bx bx-caret-right material-icons' >{statusMusic ? <BsFillPauseFill/> : <BsFillPlayFill/>}</i>
                
          </div>
          <i className='bx bxs-chevrons-right material-icons' id="next" onClick={()=>nextMusic()}><MdOutlineKeyboardDoubleArrowRight/></i>
           
          <i className='bx bxs-music material-icons' id="more-music" onClick={()=>handleShowMusicList()}><GiMusicalNotes/><h1 className="hidden">queue_music</h1></i>
    </div>
    <div className="music-list" style={{
      display: showMusicList ? "block" : "none"
    }}>
          <div className="header">
                <div className="row">
                    <i className='bx bxs-music material-icons' ></i>
                    <span>Music list</span>
                </div>
                <i className='bx bx-x material-icons' id="close" onClick={()=>handleShowMusicList()}><FaTimes/></i>
          </div>
          <ul>
          {
            allListMusic?.map((item,index)=> {
                   const duration = item.video.duration
                   let totalMin = Math.floor(duration / 60);
                   let totalSec = Math.floor(duration % 60);
                   if(totalMin < 10 ){
                        totalMin = `0${totalMin}`
                   }
                   if(totalSec < 10){
                        totalSec = `0${totalSec}`
                   }
                  return (
                  <li key={index} onClick={()=> handleClickItem(index)}>
                  <div className="row">
                      <span>{item.name}</span>
                      <p>{item.singer}</p>
                  </div>
                        <audio controls id="main-audio" style={{
                                display:"none"
                        }} >
                              <source src={item.video.url} type="audio/mp4"/>           
                       </audio>
                  <span  className="audio-duration">{index === indexMusic ? "playing" : `${totalMin}:${totalSec}`}</span>
                  
                </li>
                  )
            })
          }
          
              
          </ul>
    </div>
  
</div> );
}
 
export default MainScreen;