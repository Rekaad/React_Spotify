import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import classes from './Playlists.module.css';
import {smallPlayer, smallPlayerActions } from "../store";
import { useSelector,useDispatch } from 'react-redux';

const Playlists = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(); 
    const [token, setToken] = useState(""); // 
    const smallPlayerOpen = useSelector(smallPlayer);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        if(localStorage.getItem("access_token")){
            axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(localStorage.getItem("access_token")),
            },
        }).then((response: AxiosResponse) => {
           //console.log(response.data);
            setData(response.data);
            setIsLoading(false);
            
        }).catch((error: AxiosError)=>{
            console.log(error);
        });
        }
        //console.log(data);
    }, [])
    
    const closeSmallPlayer = () => {
        dispatch(smallPlayerActions.closeSmallPlayer())
    }

    const handleInputChange = (e:any) =>{
        const target = e.target;
        //console.log(e.target);
        const min = target.min;
        const max = target.max;
        const val = target.value;
        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    }


    if (isLoading){
        return <p> Loading </p>
    }
    else{
        if(smallPlayerOpen){
            return(            <div className={classes['playlists']}>
            <div className={classes['upperTextSmall']} onClick={closeSmallPlayer}> Now Playing</div>
            <div className={classes['smallPlayer']}> 
                <div className={classes['bigImage']}> </div>
                <div className={classes['songTitle']}> tytul </div>
                <div className={classes['songArtist']}> wykonawca</div>
                <div className={classes['progressBar']}> 
                    <input className={classes['progressInput'] } type="range" value="" min="0" max="100" onChange={(e) => handleInputChange(e)}/>
                </div>
            </div>   
        
           
        </div>);

        }
        else{
            return(            <div className={classes['playlists']}>
            <div className={classes['upperTextBig']} onClick={closeSmallPlayer}> Now Playing</div>
           { isLoading ?( <p>Loading</p>) : (<>{data?.items ? data.items.map((item) => <div className={classes['playlist']}> <ul><PlaylistItem key={item.id} playlistdata={item}/></ul></div>) : "Brak"}</>)}
           
            
        
           
        </div>);

        }
    }

};


export default Playlists;
