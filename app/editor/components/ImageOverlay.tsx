'use client'

import { Rnd } from 'react-rnd'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { updateOverlay, clearOverlay } from '@/store/imageOverlaySlice'
import { Button } from '@/components/ui/button'

export default function ImageOverlay() {
  const dispatch = useAppDispatch()
  const overlay = useAppSelector((state) => state.imageOverlay)

  if (!overlay) return null

  return (
    <div className='absolute top-0 left-0 w-full h-full z-20 pointer-events-none'>
      {/* Only Rnd component will be pointer-events-auto */}
      <Rnd
        size={{ width: overlay.width, height: overlay.height }}
        position={{ x: overlay.x, y: overlay.y }}
        onDragStop={(_, d) => {
          dispatch(updateOverlay({ x: d.x, y: d.y }))
        }}
        onResizeStop={(_, __, ref, ___, position) => {
          dispatch(
            updateOverlay({
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
              x: position.x,
              y: position.y,
            })
          )
        }}
        bounds='parent'
        style={{ zIndex: 20, pointerEvents: 'auto' }} // 🛑 Only this box will catch mouse events
      >
        <img
          src={overlay.src}
          alt='Overlay'
          className='w-full h-full object-contain pointer-events-none'
        />
      </Rnd>

      {/* Remove Overlay Button */}
      <div className='absolute top-2 right-2 z-30 pointer-events-auto'>
        <Button
          variant='destructive'
          size='sm'
          onClick={() => dispatch(clearOverlay(undefined))}
        >
          Remove Overlay
        </Button>
      </div>
    </div>
  )
}
