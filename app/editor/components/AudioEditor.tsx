'use client'

import { useAppDispatch, useAppSelector } from '../../../store/hook'
import {
  addAudioSegment,
  removeAudioSegment,
  toggleMute,
  moveAudioSegment,
} from '../../../store/audioSlice'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from '@/components/ui/button'

const ItemTypes = {
  AUDIO: 'audio',
}

const Segment = ({ segment, index }: { segment: any; index: number }) => {
  const dispatch = useAppDispatch()

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
      className={`flex items-center justify-between px-4 py-2 rounded-lg border shadow-sm w-full max-w-sm ${
        segment.muted ? 'bg-gray-200' : 'bg-blue-100'
      }`}
    >
      <span className='font-medium'>{segment.label}</span>
      <div className='flex gap-2'>
        <Button
          size='sm'
          variant='outline'
          onClick={() => dispatch(toggleMute(segment.id))}
        >
          {segment.muted ? 'Unmute' : 'Mute'}
        </Button>
        <Button
          size='sm'
          variant='destructive'
          onClick={() => dispatch(removeAudioSegment(segment.id))}
        >
          ✕
        </Button>
      </div>
    </div>
  )
}

export default function AudioEditor() {
  const segments = useAppSelector((state) => state.audio)
  const dispatch = useAppDispatch()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>🎧 Audio Tracks</h2>
        <div className='flex flex-col gap-2'>
          {segments.map((segment, i) => (
            <Segment key={segment.id} segment={segment} index={i} />
          ))}
        </div>
        <Button onClick={() => dispatch(addAudioSegment())}>
          + Add Audio Segment
        </Button>
      </div>
    </DndProvider>
  )
}
