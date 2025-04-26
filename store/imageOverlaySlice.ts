import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Overlay {
  id: string
  src: string
  x: number
  y: number
  width: number
  height: number
}

const initialState: Overlay | null = null

const imageOverlaySlice = createSlice({
  name: 'imageOverlay',
  initialState,
  reducers: {
    setOverlay: (
      _,
      action: PayloadAction<{
        id: string
        src: string
        width: number
        height: number
      }>
    ) => ({
      id: action.payload.id,
      src: action.payload.src,
      x: 50,
      y: 50,
      width: action.payload.width,
      height: action.payload.height,
    }),
    updateOverlay: (
      state,
      action: PayloadAction<
        Partial<Pick<Overlay, 'x' | 'y' | 'width' | 'height'>>
      >
    ) => {
      if (state) {
        return { ...state, ...action.payload }
      }
      return state
    },
    clearOverlay: () => null,
  },
})

export const { setOverlay, updateOverlay, clearOverlay } =
  imageOverlaySlice.actions
export default imageOverlaySlice.reducer
