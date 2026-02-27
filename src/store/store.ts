import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './createProfileSlice';
import modalReducer from "./createModalSlice";
import videoPlayerReducer from './createVideoPlayerSlice';

const store = configureStore({
    reducer: {
        profile: profileReducer,
        modal: modalReducer,
        videoPlayer: videoPlayerReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store