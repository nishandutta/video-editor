import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

interface AudioSegment {
  id: string
  label: string
  muted: boolean
}

const initialState: AudioSegment[] = []

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addAudioSegment: (state) => {
      state.push({
        id: nanoid(),
        label: `Segment ${state.length + 1}`,
        muted: false,
      })
    },
    removeAudioSegment: (state, action: PayloadAction<string>) => {
      return state.filter((segment) => segment.id !== action.payload)
    },
    toggleMute: (state, action: PayloadAction<string>) => {
      const segment = state.find((s) => s.id === action.payload)
      if (segment) segment.muted = !segment.muted
    },
    moveAudioSegment: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const [moved] = state.splice(action.payload.from, 1)
      state.splice(action.payload.to, 0, moved)
    },
  },
})

export const {
  addAudioSegment,
  removeAudioSegment,
  toggleMute,
  moveAudioSegment,
} = audioSlice.actions

export default audioSlice.reducer
