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
    addSubtitle: (state, action: PayloadAction<Omit<Subtitle, 'id'>>) => {
      state.push({
        id: nanoid(),
        ...action.payload,
      })
    },
    removeSubtitle: (state, action: PayloadAction<string>) => {
      return state.filter((subtitle) => subtitle.id !== action.payload)
    },
    updateSubtitle: (
      state,
      action: PayloadAction<{ id: string; field: keyof Subtitle; value: any }>
    ) => {
      const subtitle = state.find((s) => s.id === action.payload.id)
      if (subtitle) {
        ;(subtitle[action.payload.field] as any) = action.payload.value
      }
    },
  },
})

export const { addSubtitle, removeSubtitle, updateSubtitle } =
  subtitleSlice.actions
export default subtitleSlice.reducer
