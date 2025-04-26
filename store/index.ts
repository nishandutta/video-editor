import { configureStore } from '@reduxjs/toolkit'
import videoReducer from './videoSlice'
import audioReducer from './audioSlice'
import subtitleReducer from './subtitleSlice'
import imageOverlayReducer from './imageOverlaySlice'

export const store = configureStore({
  reducer: {
    video: videoReducer,
    audio: audioReducer,
    subtitle: subtitleReducer,
    imageOverlay: imageOverlayReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
