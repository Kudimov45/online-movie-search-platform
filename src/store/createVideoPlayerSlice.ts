import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface VideoPlayerState {
  isOpen: boolean;
  videoUrl: string | null;
  title: string | null;
}

const initialState: VideoPlayerState = {
  isOpen: false,
  videoUrl: null,
  title: null,
};

const videoPlayerSlice = createSlice({
  name: 'videoPlayer',
  initialState,
  reducers: {
    openVideoPlayerModal: (state, action: PayloadAction<{ videoUrl: string; title: string }>) => {
      state.isOpen = true;
      state.videoUrl = action.payload.videoUrl;
      state.title = action.payload.title;
    },
    closeVideoPlayerModal: (state) => {
      state.isOpen = false;
      state.videoUrl = null;
      state.title = null;
    },
  },
});

export const { openVideoPlayerModal, closeVideoPlayerModal } = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;