import classes from './Player.module.css';
import {AiOutlinePauseCircle,AiFillPauseCircle, AiFillPlayCircle, AiOutlinePlayCircle} from 'react-icons/ai';
import {FiFastForward, FiRepeat, FiShuffle} from 'react-icons/fi';
import { RiShuffleLine } from 'react-icons/ri';
import {MdReplay} from 'react-icons/md'
import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import { useSelector,useDispatch } from 'react-redux';
import { track,trackActions,smallPlayer, smallPlayerActions } from '../store';



const Player = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [device, setDevice] = useState("");
    const [currdev, setCurrDev] = useState("")
    const [currplay, setCurrPlay] = useState("");
    const [play, setPlay] = useState(false);
    const curr = useSelector(track);
    const smallPlayerOpen = useSelector(smallPlayer);
    const dispatch = useDispatch();
  
    
    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://api.spotify.com/v1/me/player/devices`, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${(localStorage.getItem("access_token"))}`,
            },
        }).then((response: AxiosResponse) => {
           console.log(response.data.devices[0]?.id);
            setDevice(response.data.devices[0]?.id);
            localStorage.setItem("device", response.data.devices[0]?.id);
            
            
        }).catch((error: AxiosError)=>{
            console.log(error);
        });
        
        setIsLoading(false);
        axios.put(`https://api.spotify.com/v1/me/player`, {
            device_ids: [localStorage.getItem("device")],
        },{
                
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },

        }).then((response: AxiosResponse) => {
            //console.log(response.data);
            setCurrDev(response.data);
            
        }).catch((error: AxiosError)=>{
            console.log(error);
        });
    }, [setDevice,setCurrDev])
    useEffect(() => {
        setPlay(true);
        axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(localStorage.getItem("access_token")),
            },
        }).then((response: AxiosResponse) => {
           console.log(response.data);
            setCurrPlay(response.data);
            setIsLoading(false);
            console.log(currplay)
            console.log(curr);
            
        }).catch((error: AxiosError)=>{
            console.log(error);
        });

    },[curr])
    
    const repeatHandler = () => {

        console.log("Repeat");
    }

    const backwardHandler = () => {

        console.log("Backward");
    }

    const forwardHandler = () => {

        console.log("Forward");
    }

    const shuffleHandler = () => {

        console.log("Shuffle");
    }

    const playHandler = () => {
        if(isPlaying){
            setIsPlaying(false);
            console.log("paused");
        }
        else{
            axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=50`, {}, 
            {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }

            }).then((response: AxiosResponse) => {
                //console.log(response);
                //setData(response.data);
                
            }).catch((error: AxiosError)=>{
                console.log(error);
            });
            axios.options(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
                data: {
                    "uris": [`${curr}`],
                    "offset": {
                      "position": "0"
                    }
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
            }).then((response: AxiosResponse) => {
               // console.log(response);
                //setData(response.data);
                
            }).catch((error: AxiosError)=>{
                console.log(error);
            });
            axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device}`,
             JSON.stringify({
                "uris": [`${curr}`],
                "offset": {
              "position": 0
            }, "position_ms" : 0}),{

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
            }).then((response: AxiosResponse) => {
                //console.log(response);
                //setData(response.data);
                
            }).catch((error: AxiosError)=>{
                console.log(error);
            });
            
            setIsPlaying(true);
            console.log("playing");
          
        }
        
    }

    const openSmallPlayer = () => {
        dispatch(smallPlayerActions.openSmallPlayer());
        console.log("test");
    }
/*
 
      
  <SpotifyWebPlayer token={String(localStorage.getItem("access_token"))} uris={curr} initialVolume={0.01} play={play} callback={state => {if(!state.isPlaying) setPlay(false)}}/>  
            
              
    
*/

    if(isLoading){
        return <p>Loading</p>
    }
    else{
        if(!smallPlayerOpen){
            return(
                <div>
                { isLoading ? <p> Loading </p> : <div className={classes['player-bar']} onClick={openSmallPlayer}>
                      <div className={classes['songInfo']} onClick={(e) => { e.stopPropagation()}}>
                          <div className={classes['songImage']}> </div>
                          <div className={classes['textInfo']}>
                          <div className={classes['songTitle']}> tytul </div>
                          <div className={classes['songArtist']}> wykonawca</div>
                            </div>
                          
                        </div>
                      <div className={classes['main-control']} onClick={(e) => { e.stopPropagation()}}> 
                     
                    <div className={classes['replay']}>  <MdReplay onClick={repeatHandler} size={'100%'} /></div>
                    <div className={classes['back']}><FiFastForward onClick={backwardHandler} size={'100%'}/></div>
                    <div className={classes['center']}> {isPlaying ? <AiOutlinePauseCircle onClick={playHandler} size={'100%'}/> : <AiOutlinePlayCircle onClick={playHandler} size={'100%'}/> }</div>
                    <div className={classes['forward']}><FiFastForward onClick={forwardHandler} size={'100%'} />  </div>  
                    <div className={classes['shuffle']}> <RiShuffleLine onClick={shuffleHandler} size={'100%'} /> </div>
                    </div>
                    
        
                    
                    
                </div> }
                </div>
              
            );
        }
        else{
            return(
                <div>
                { isLoading ? <p> Loading </p> : <div className={classes['player-bar']} style={{backgroundColor:"white"}} onClick={openSmallPlayer}>
                    
                      <div className={classes['main-controlSmall']} onClick={(e) => { e.stopPropagation()}}> 
                     
                    <div className={classes['replaySmall']}>  <MdReplay onClick={repeatHandler} size={'100%'} color={"#3C7AC7"} /></div>
                    <div className={classes['backSmall']}><FiFastForward onClick={backwardHandler} size={'100%'} color={"#3C7AC7"}/></div>
                    <div className={classes['centerSmall']}> {isPlaying ? <AiFillPauseCircle onClick={playHandler} size={'100%'} color={"#3C7AC7"}/> : <AiFillPlayCircle onClick={playHandler} size={'100%'} color={"#3C7AC7"}/> }</div>
                    <div className={classes['forwardSmall']}><FiFastForward onClick={forwardHandler} size={'100%'} color={"#3C7AC7"}/>  </div>  
                    <div className={classes['shuffleSmall']}> <RiShuffleLine onClick={shuffleHandler} size={'100%'} color={"#3C7AC7"}/> </div>
                    </div>
                    
        
                    
                    
                </div> }
                </div>
              
            );
        }
    }



};

export default Player;