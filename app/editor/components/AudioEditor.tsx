// app/editor/components/AudioEditor.tsx
'use client'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  addAudioSegment,
  removeAudioSegment,
  toggleMute,
  moveAudioSegment,
} from '@/store/audioSlice'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const ItemTypes = {
  AUDIO: 'audio',
}

const Segment = ({ segment, index }: { segment: any; index: number }) => {
  const dispatch = useAppDispatch()
  const [hovered, setHovered] = useState(false)

  const [, dragRef] = useDrag({
    type: ItemTypes.AUDIO,
    item: { index },
  })

  const [, dropRef] = useDrop({
    accept: ItemTypes.AUDIO,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        dispatch(moveAudioSegment({ from: item.index, to: index }))
        item.index = index
      }
    },
  })

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={`relative flex items-center justify-center px-4 py-2 rounded-md font-semibold text-white text-xs shadow-md ${
        segment.muted ? 'bg-gray-400' : 'bg-blue-500'
      } hover:shadow-lg transition-all`}
      style={{
        width: '150px',
        height: '50px',
        cursor: 'grab',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main label */}
      <span className='truncate'>{segment.label}</span>

      {/* Hover Menu inside the box */}
      {hovered && (
        <div className='absolute top-1 right-1 flex gap-1'>
          <Button
            size='icon'
            variant='ghost'
            className='h-6 w-6 text-white hover:bg-gray-700'
            onClick={(e) => {
              e.stopPropagation()
              dispatch(toggleMute(segment.id))
            }}
          >
            {segment.muted ? '🔊' : '🔇'}
          </Button>
          <Button
            size='icon'
            variant='ghost'
            className='h-6 w-6 text-white hover:bg-red-600'
            onClick={(e) => {
              e.stopPropagation()
              dispatch(removeAudioSegment(segment.id))
            }}
          >
            🗑️
          </Button>
        </div>
      )}
    </div>
  )
}

export default function AudioEditor() {
  const segments = useAppSelector((state) => state.audio)
  const dispatch = useAppDispatch()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold'>🎧 Audio Timeline</h2>

        {/* Fake Static Waveform Background */}
        <div className='relative w-full bg-gray-100 p-4 rounded-xl overflow-x-auto min-h-[150px]'>
          <img
            src='/waveform.png'
            alt='Static Waveform'
            className='w-full h-24 object-cover opacity-40 rounded-md'
          />

          {/* Audio Segments aligned horizontally */}
          <div className='absolute top-8 left-8 flex gap-4'>
            {segments.map((segment, i) => (
              <Segment key={segment.id} segment={segment} index={i} />
            ))}
          </div>
        </div>

        {/* Add Segment Button Only */}
        <Button onClick={() => dispatch(addAudioSegment())}>
          + Add Audio Segment
        </Button>
      </div>
    </DndProvider>
  )
}
