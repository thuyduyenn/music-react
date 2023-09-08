
import { useCallback, useEffect, useReducer, useState } from "react";
import { createContext } from "react";
import {baseUrl,postRequest,getRequest} from "../../utils/services"
export const AuthContext = createContext()


export const AuthContextProvider = ({children})=> {
    const [flatAddMusic,setFlatAddMusic]  = useState(false)
    const [autoPlay,setAutoPlay] = useState(false)
    const [statusMusic,setStatusMusic] = useState(false)
    const handleStatusMusic = useCallback((info)=> {
        setStatusMusic(info)
    })
    const handleChangeFlatAddMusic = useCallback(()=> {
        setFlatAddMusic(!flatAddMusic)
    },[flatAddMusic])
    const [listInfo,setListInfo] = useState({
          name:"",
          singer:"",
          image:"",
          video:""
    })
    const handleChangeListInfo = useCallback((info)=> {
        setListInfo(info)
    })
    const [addLoading,setAddLoading] = useState(false)
    const [addError,setAddError] = useState(null)

    const [allListMusic,setAllListMusic] = useState([])
    const [indexMusic,setIndexMusic] = useState(0)
    const [targetMusic,setTargetMusic] = useState(null)
    useEffect(()=> {
        loadMusic(indexMusic)
    },[indexMusic,allListMusic])
    const loadMusic = useCallback((index)=> {
        setTargetMusic(allListMusic[index])
        const audioMain  = document.querySelector("#main-audio")
        
        if(audioMain){
            if(autoPlay){
                audioMain.play()   
                handleStatusMusic(true)
            }
          
        }
    })
    
    

    useEffect(()=> {
        const getAllMusic = async()=> {
               const response = await getRequest(`${baseUrl}/create/get/all`)
               if(response.error){
                  return null
               }
               setAllListMusic(response)
              

        }
        getAllMusic()

    },[])


        


  
 
    const handlePressAdd = useCallback(async()=> {
        setAddError(null)
        setAddLoading(true)
        const response = await postRequest(`${baseUrl}/create/music`,JSON.stringify(listInfo))
        setAddLoading(false)
        if(response.error){
           return setAddError(response)
        }
        setAllListMusic([
            ...allListMusic,
            response
        ])
        setListInfo({
            name:"",
            singer:"",
            image:"",
            video:""
        })


    },[listInfo])
    const handleChangeIndex = useCallback((index)=> {
        setIndexMusic(index)
    })
    const PlayMusic = useCallback(()=> {
        handleStatusMusic(true)
       const mainAudio = document.querySelector("#main-audio")
       mainAudio.play()
       setAutoPlay(true)
       
    
}) 
const PauseMusic = useCallback(()=> {
      handleStatusMusic(false)
     const mainAudio = document.querySelector("#main-audio")
     mainAudio.pause()
     
})
const prevMusic = useCallback(()=> {
  const mainAudio = document.querySelector("#main-audio")
  mainAudio.pause()
  handleStatusMusic(false)
  let decreIndex = indexMusic === 0 ? allListMusic?.length - 1 : indexMusic - 1
  handleChangeIndex(decreIndex)
  

  
},[indexMusic,allListMusic])
const nextMusic = useCallback(()=> {
  const mainAudio = document.querySelector("#main-audio")
  mainAudio.pause()
  handleStatusMusic(false)
  let increIndex = indexMusic === allListMusic?.length - 1 ? 0 : indexMusic + 1
  handleChangeIndex(increIndex)

},[indexMusic,allListMusic])
const initial = {
    type:"repeat",

}
const reducer = (state,action)=> {
       switch (action.type){
            case "repeat" : {
                return {
                       ...state,
                       type:"repeat-one",
                     
                      

                }
            }
            case "repeat-one": {
                return {
                        ...state,
                        type:"shuffle",
                 
                       
                }
            }
            case "shuffle": {
                  return {
                      ...state,
                      type:"repeat",
                 
                  }
            }
            default: {
                return state
                }
       }
}
const [state,dispatch] = useReducer(reducer,initial)
const handleDispatch = useCallback((info)=> {
    dispatch(info)
})

const mainAudioEnded = useCallback(async()=> {
       const mainAudio = await document.querySelector("#main-audio")
       switch(state.type){
           case "repeat":
               nextMusic()
               break;
            case "repeat-one":

                if(mainAudio){
                    mainAudio.currentTime = 0;
                    loadMusic(indexMusic)

                }
 
                break;
            case "shuffle":
               
                let randomIndex = Math.floor((Math.random() * allListMusic?.length));
                do {
                   randomIndex = Math.floor((Math.random() * allListMusic?.length));
                } while(indexMusic === randomIndex);

                mainAudio.pause()
                handleStatusMusic(true)
                setIndexMusic(randomIndex)
                break;
       }
},[state,indexMusic,allListMusic])
const progressBar = document.querySelector(".progress-bar")
const handleTimeUpdate = useCallback((e)=> {
      
      const currentTime = e.target.currentTime
      const duration = e.target.duration
      const progressWidth = (currentTime / duration) * 100
      progressBar.style.width = `${progressWidth}%`;
      let musicCurrentTime = document.querySelector(".current");
      let musicDuration = document.querySelector(".duration");
      let totalMin = Math.floor(duration / 60);
      let totalSec = Math.floor(duration % 60);
      if(totalSec < 10 ){
        totalSec = `0${totalSec}` 
      }
      musicDuration.innerText = `${totalMin}:${totalSec}`
      let currentMin = Math.floor(currentTime / 60);
       let currentSec = Math.floor(currentTime % 60);
       if(currentSec < 10 ) {
        currentSec  = `0${currentSec}`;
       }
       musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
 
})
const progressArea = document.querySelector(".progress-area")
progressArea?.addEventListener("click",async(e)=> {
    const mainAudio = await  document.querySelector("#main-audio")
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration
    mainAudio.play()
})

const [showMusicList,setMusicList] = useState(false)
const handleShowMusicList = useCallback(()=> {
    setMusicList(!showMusicList)
},[showMusicList])
const handleClickItem = useCallback(async(index)=> {
    setAutoPlay(true)
    const mainAudio = await document.querySelector("#main-audio")
    handleStatusMusic(true)
    setIndexMusic(index)
})
    return (
        <AuthContext.Provider value={
            {
                flatAddMusic,
                handleChangeFlatAddMusic,
                listInfo,
                handleChangeListInfo,
                handlePressAdd,
                addLoading,
                addError,
                indexMusic,
                handleChangeIndex,
                allListMusic,
                targetMusic,
                loadMusic,
                handleStatusMusic,
                statusMusic,
                prevMusic,
                nextMusic,
                PauseMusic,
                PlayMusic,
                mainAudioEnded,
                handleDispatch,
                state,
                handleTimeUpdate,
                handleShowMusicList,
                showMusicList,
                handleShowMusicList,
                handleClickItem,
                listInfo
          

            }
            }>
            {children}
        </AuthContext.Provider>
    )
}