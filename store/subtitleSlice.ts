import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

interface Subtitle {
  id: string
  text: string
  startTime: number
  endTime: number
  font: string
  size: number
  color: string
  position: 'top' | 'middle' | 'bottom'
}

const initialState: Subtitle[] = []

const subtitleSlice = createSlice({
  name: 'subtitle',
  initialState,
  reducers: {
    addSubtitle: (state) => {
      state.push({
        id: nanoid(),
        text: 'New Subtitle',
        startTime: 0,
        endTime: 5,
        font: 'Arial',
        size: 16,
        color: '#FFFFFF',
        position: 'bottom',
      })
    },
    updateSubtitle: (
      state,
      action: PayloadAction<{ id: string; field: keyof Subtitle; value: any }>
    ) => {
      const sub = state.find((s) => s.id === action.payload.id)
      if (sub) {
        sub[action.payload.field] = action.payload.value
      }
    },
    removeSubtitle: (state, action: PayloadAction<string>) =>
      state.filter((s) => s.id !== action.payload),
  },
})

export const { addSubtitle, updateSubtitle, removeSubtitle } =
  subtitleSlice.actions

export default subtitleSlice.reducer
