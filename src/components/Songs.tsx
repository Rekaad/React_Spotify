import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect,useState } from "react";
import SongItem from "./SongItem";
import classes from './Songs.module.css';

const Songs:React.FC<{tracks:SpotifyApi.PlaylistObjectSimplified}> = (props) => {
//console.log(props.tracks);
const [token, setToken] = useState("");
const [data, setData] = useState<SpotifyApi.PlaylistTrackResponse>(); 

useEffect(() => {
      //console.log(props.tracks);
      if(localStorage.getItem("access_token")){
          setToken(String(localStorage.getItem("access_token")));
          //console.log(token);
          axios.get(`${props.tracks.tracks.href}`, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(localStorage.getItem("access_token")),
          },
      }).then((response: AxiosResponse) => {
          //console.log(response.data.items);
          setData(response.data);
          
      }).catch((error: AxiosError)=>{
          console.log(error);
      });
      }
     //console.log(data); {data?.items ? data.items.map((item) => <ul><PlaylistItem key={item.id} playlistdata={item}/></ul>) : "Brak"}</>)} {data?.name ? data.name.map((name) => )}
     //<li><SongItem trackinfo={data}/></li>  
  }, [])
  {console.log(data?.items)}
return(
     
      <div className={classes.songs}> 
      {data?.items ? data.items.map((track)=>  <SongItem trackinfo={track}/>) : "Brak"}
      </div>
    
);

};

export default Songs;