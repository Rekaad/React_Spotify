import { AiOutlinePlayCircle } from 'react-icons/ai';
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import classes from './SongItem.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { trackActions, track } from '../store';


const SongItem:React.FC<{trackinfo:SpotifyApi.PlaylistTrackObject}> = (props) => {
       //console.log(props.trackinfo.track);
        const dispatch = useDispatch();
        const curr = useSelector(track);
        const onClickSongHandler = () => {
            console.log(props.trackinfo.track?.uri);
            dispatch(trackActions.chooseTrack(String(props.trackinfo.track?.uri)));

        }

        const convertTime = (duration:number) => {
            const portions: string[] = [];
            const msInHour = 1000*60*60;
            const hours = Math.trunc(duration/msInHour);
            if(hours >0){
                portions.push(hours +'');
                duration = duration - (hours * msInHour);
            }

            const msInMinute = 1000*60;
            const minutes = Math.trunc(duration/msInMinute);
            if(minutes > 0){
                portions.push(minutes+"");
                duration = duration - (minutes * msInMinute);
            }
            const seconds = Math.trunc(duration/1000);
            if(seconds > 0){
                if(seconds < 10){
                    portions.push("0"+seconds);
                }
                else{
                    portions.push(seconds+"");
                }
                
            }
            else if(seconds === 0){
                portions.push("00");
            }
            return portions.join(":");
        }

    return(
            
            <div className={classes['songitem']}> 
            <div className={classes['playbtn']}> <div style={{marginLeft:"25%", marginRight:"25%"}}> <AiOutlinePlayCircle onClick={onClickSongHandler} size={"100%"} /></div> </div>
             <div className={classes['songname']}> {props.trackinfo.track?.name} </div>  
             <div className={classes['songalbum']}> {props.trackinfo.track?.album?.name} </div>
             <div className={classes['songrelease']}> {props.trackinfo.track?.album.release_date}</div>
             <div className={classes['songduration']}> {convertTime(Number(props.trackinfo.track?.duration_ms))}</div>
             <div className={classes['dotmenu']}> <BiDotsHorizontalRounded /> </div>

             </div>

            
            //data?.items ? data.items.map((item) => <ul><PlaylistItem key={item.id} playlistdata={item}/></ul>) : "Brak"}
            
    );

};

export default SongItem;
