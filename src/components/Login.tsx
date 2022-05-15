import { useEffect,useState } from "react";
import Player from "./Player";
import Playlists from "./Playlists";
import classes from './Login.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { auth, authActions, smallPlayer, smallPlayerActions } from "../store";



// http://localhost:3000/#access_token=BQC-F5Z1yFDEb32MHOTEfPyfiWbkfd_Qp8its2PvTvMma2DV57WEpUhOfQ2z8ba2qZMGhRCLJbWgcUPUElsuBkbTp-C81OMaU0k4TWSEY-N_x7DASHDAUC8chhnPuvmqy175__aNtm3gnDtWSpV2HBFITrUd6WxAtLRKCpFDxmg&token_type=Bearer&expires_in=3600
const CLIENT_ID:string = "7a31de350dba4845982483ef7c780c60";
const SPOTIFY_AUTHORIZE_ENDPOINT: string = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN:string = "http://localhost:3000";
const SCOPES:string[] = ['user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state','user-read-email','user-read-private', 'user-read-recently-played','user-read-playback-position','user-top-read'];
const SCOPES_URL:string = SCOPES.join("%20");

const Login = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(auth);
  const returnedToken = (hash:string) => {

    const stringAfterHash = hash.substring(1);
    //console.log(stringAfterHash);
    const paramsInUrl = stringAfterHash.split("&");
    //console.log(paramsInUrl)
    const paramsSplitUp = paramsInUrl.reduce((accumulator:any, currentValue:string) => {
      //console.log(currentValue);
      //console.log(accumulator);
      const [key, value] = currentValue.split("=");
      accumulator[key] = value;
      //console.log(accumulator);
      return accumulator;
    }, {});
    return paramsSplitUp;
  }

useEffect(() => {
  //console.log(window.location.hash);
  if(window.location.hash){
const {access_token, expires_in, token_type} = returnedToken(window.location.hash);
    localStorage.clear();
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("token_type", token_type);
    localStorage.setItem("expirexIn", expires_in);
    dispatch(authActions.login());
   // console.log(access_token);
    window.history.pushState("","", REDIRECT_URL_AFTER_LOGIN);

  }

},[])

const getAuth = async () => {

 
 window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL}&response_type=token&show_dialog=true`;


/*   var client_id = '';
var client_secret = '';

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    body: 'grant_type=client_credentials'
  });

  const data = await result.json();
  return data.access_token; */
};
//dodac state na token 

return(
  <div style={{height:"100vh"}}> 
    {!isLogged ? <button onClick={getAuth}>Login</button> : (<div className={classes['container']}> <div className={classes['playlists']}>  <Playlists /> </div> <div className={classes['player']}> <Player /> </div> </div>)}

 
  </div>
  
);
}

export default Login;