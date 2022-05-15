import { useState } from 'react';
import classes from './PlaylistItem.module.css';
import Songs from './Songs';
import {IoIosArrowDropdown} from 'react-icons/io';

const PlaylistItem: React.FC<{playlistdata:SpotifyApi.PlaylistObjectSimplified}> = (props) => {

    const [open, setOpen] = useState("invi");

    const showSongsHandler = () => {
        //console.log(props.playlistdata);
        if(open === "invi"){
            setOpen("visi");
        }
        else{
            setOpen("invi");
        }
}

    //console.log(props.playlistdata);
    return(
        <div className={classes['playlist']}>
            <li>
            <div className={classes['dropdown']}>    
                <div className={classes['dropdowntitle']}>
                <div className={classes['playlistUP']}> PLAYLIST</div>        
                <div className={classes['playlistname']} > {props.playlistdata.name} </div> 
                </div>
                <div className={classes['playlist-btn']}> <div className={classes['icon']}><IoIosArrowDropdown onClick={showSongsHandler} size={"100%"} color={"#D8D8D8"} /> </div>  </div>
                
            </div>
            

            <div className={classes[`${open}`]}>
                <li>  <Songs key={props.playlistdata.id} tracks={props.playlistdata}/> </li>
        
               
            </div>
            </li>
            
               
         
        
        </div>
    );

}

export default PlaylistItem;