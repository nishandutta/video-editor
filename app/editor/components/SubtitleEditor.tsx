// app/editor/components/SubtitleEditor.tsx
'use client'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addSubtitle, removeSubtitle } from '@/store/subtitleSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

export default function SubtitleEditor() {
  const subtitles = useAppSelector((state) => state.subtitle)
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [startInput, setStartInput] = useState('')
  const [endInput, setEndInput] = useState('')
  const [font, setFont] = useState('Arial')
  const [size, setSize] = useState(24)
  const [color, setColor] = useState('#FFFFFF')
  const [position, setPosition] = useState<'top' | 'middle' | 'bottom'>(
    'bottom'
  )

  const handleAdd = () => {
    const startTime = parseFloat(startInput) * 60
    const endTime = parseFloat(endInput) * 60

    if (!text.trim()) {
      alert('Subtitle text cannot be empty!')
      return
    }
    if (startTime >= endTime) {
      alert('Start time must be less than end time!')
      return
    }

    dispatch(
      addSubtitle({
        text,
        startTime,
        endTime,
        font,
        size,
        color,
        position,
      })
    )

    setText('')
    setStartInput('')
    setEndInput('')
    setFont('Arial')
    setSize(24)
    setColor('#FFFFFF')
    setPosition('bottom')
    setOpen(false)
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>💬 Subtitles</h2>

      {/* Show existing subtitles */}
      {subtitles.map((s) => (
        <div
          key={s.id}
          className='p-4 border rounded-lg flex flex-col gap-2 bg-gray-50'
        >
          <div className='font-bold'>{s.text}</div>
          <div className='text-sm text-gray-600'>
            {Math.floor(s.startTime / 60)}m {Math.round(s.startTime % 60)}s →{' '}
            {Math.floor(s.endTime / 60)}m {Math.round(s.endTime % 60)}s
          </div>
          <Button
            variant='destructive'
            size='sm'
            onClick={() => dispatch(removeSubtitle(s.id))}
          >
            Delete
          </Button>
        </div>
      ))}

      {/* Add New Subtitle Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>+ Add Subtitle</Button>
        </DialogTrigger>
        <DialogContent className='max-w-sm'>
          <DialogHeader>
            <DialogTitle>Add New Subtitle</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col gap-4 py-4'>
            <Input
              placeholder='Subtitle Text'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Input
              type='text'
              placeholder='Start Time (minutes.decimal)'
              value={startInput}
              onChange={(e) => setStartInput(e.target.value)}
            />
            <Input
              type='text'
              placeholder='End Time (minutes.decimal)'
              value={endInput}
              onChange={(e) => setEndInput(e.target.value)}
            />

            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className='border rounded p-2'
            >
              <option value='Arial'>Arial</option>
              <option value='Courier New'>Courier New</option>
              <option value='Georgia'>Georgia</option>
              <option value='Times New Roman'>Times New Roman</option>
            </select>

            <Input
              type='number'
              placeholder='Font Size'
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />

            <Input
              type='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <select
              value={position}
              onChange={(e) =>
                setPosition(e.target.value as 'top' | 'middle' | 'bottom')
              }
              className='border rounded p-2'
            >
              <option value='top'>Top</option>
              <option value='middle'>Middle</option>
              <option value='bottom'>Bottom</option>
            </select>
          </div>

          <DialogFooter>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
