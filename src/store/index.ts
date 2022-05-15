import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {isAuthenticated:false}
const initialTrackState = {uri: ""};
const smallPlayerState = {isOpen:false};

const trackSlice = createSlice({

    name: 'track', 
    initialState: initialTrackState,
    reducers: {
        chooseTrack: (state,action: PayloadAction<string>) => {
            state.uri = action.payload;
        }
        
    }
});


const authSlice = createSlice({
    name: 'autherntication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

const smallPlayerSlice = createSlice({
    name: 'smallPlayer', 
    initialState: smallPlayerState,
    reducers: {
        openSmallPlayer: (state) => {
            state.isOpen = true;
        },
        closeSmallPlayer: (state) => {
            state.isOpen = false;
        }
        
    }
});


const store = configureStore({
    reducer: {
        track: trackSlice.reducer,
        auth: authSlice.reducer,
        smallPlayer: smallPlayerSlice.reducer
    }
});

export const trackActions = trackSlice.actions;
export const authActions = authSlice.actions;
export const smallPlayerActions = smallPlayerSlice.actions;
type RootState = ReturnType<typeof store.getState>;
export const auth = (state:RootState) => state.auth.isAuthenticated;
export const track = (state:RootState) => state.track.uri;
export const smallPlayer = (state:RootState) => state.smallPlayer.isOpen;
export default store;