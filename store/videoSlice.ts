import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

interface Scene {
  id: string
  name: string
  thumbnail: string
  startTime: number
  endTime: number
}

interface VideoState {
  fileName: string | null
  preview: string
  progress: number
  scenes: Scene[]
}

const initialState: VideoState = {
  fileName: null,
  preview: '',
  progress: 0,
  scenes: [],
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideo: (
      state,
      action: PayloadAction<{ fileName: string; preview: string }>
    ) => {
      state.fileName = action.payload.fileName
      state.preview = action.payload.preview
      state.progress = 0
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload
    },
    resetVideo: (state) => {
      state.fileName = null
      state.preview = ''
      state.progress = 0
      state.scenes = []
    },
    addScene: (
      state,
      action: PayloadAction<{
        name: string
        startTime: number
        endTime: number
        thumbnail: string
      }>
    ) => {
      const newScene = {
        id: nanoid(),
        name: action.payload.name,
        thumbnail: action.payload.thumbnail,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
      }
      state.scenes.push(newScene)
    },
    removeScene: (state, action: PayloadAction<string>) => {
      state.scenes = state.scenes.filter((scene) => scene.id !== action.payload)
    },
    moveScene: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const [movedScene] = state.scenes.splice(action.payload.from, 1)
      state.scenes.splice(action.payload.to, 0, movedScene)
    },
  },
})

export const {
  setVideo,
  setProgress,
  resetVideo,
  addScene,
  removeScene,
  moveScene,
} = videoSlice.actions

export default videoSlice.reducer
