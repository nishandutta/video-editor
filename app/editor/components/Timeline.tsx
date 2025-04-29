'use client'

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addScene, removeScene, moveScene } from '@/store/videoSlice'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useDropzone } from 'react-dropzone'

const ItemTypes = {
  SCENE: 'scene',
}

const SceneThumbnail = ({ scene, index }: { scene: any; index: number }) => {
  const dispatch = useAppDispatch()

  const [, dragRef] = useDrag({
    type: ItemTypes.SCENE,
    item: { index },
  })

  const [, dropRef] = useDrop({
    accept: ItemTypes.SCENE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        dispatch(moveScene({ from: item.index, to: index }))
        item.index = index
      }
    },
  })

  return (
    <div
      ref={(node) => {
        if (node) dragRef(dropRef(node))
      }}
      className='relative group cursor-move rounded-lg overflow-hidden border border-gray-300'
    >
      <img
        src={scene.thumbnail}
        alt='scene'
        className='w-24 h-16 object-cover'
      />
      <div className='absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 rounded'>
        {scene.name}
        <br />
        {scene.startTime}s - {scene.endTime}s
      </div>
      <button
        onClick={() => dispatch(removeScene(scene.id))}
        className='absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition'
      >
        ✕
      </button>
    </div>
  )
}

export default function Timeline() {
  const { scenes } = useAppSelector((state) => state.video)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(5)
  const [thumbnail, setThumbnail] = useState<string>('')

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        const preview = URL.createObjectURL(file)
        setThumbnail(preview)
      }
    },
  })

  const handleAddScene = () => {
    if (startTime < endTime && name && thumbnail) {
      dispatch(addScene({ name, startTime, endTime, thumbnail }))
      setOpen(false)
      setName('')
      setStartTime(0)
      setEndTime(5)
      setThumbnail('')
    } else {
      alert('Fill all fields correctly!')
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='space-y-4'>
        <div className='flex flex-wrap gap-4 overflow-x-auto p-2 bg-gray-100 rounded-lg min-h-[70px]'>
          {scenes.map((scene, index) => (
            <SceneThumbnail key={scene.id} scene={scene} index={index} />
          ))}
        </div>

        {/* Dialog for Adding Scene */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>+ Add Scene</Button>
          </DialogTrigger>
          <DialogContent className='max-w-sm'>
            <DialogHeader>
              <DialogTitle>Add New Scene</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-4 py-4'>
              <Input
                placeholder='Scene Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type='number'
                placeholder='Start Time (seconds)'
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
              />
              <Input
                type='number'
                placeholder='End Time (seconds)'
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
              />

              {/* Thumbnail Upload */}
              <div
                {...getRootProps()}
                className='border border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-100 hover:bg-gray-200'
              >
                <input {...getInputProps()} />
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt='Thumbnail'
                    className='w-32 mx-auto rounded-md'
                  />
                ) : (
                  <p>Drag & drop thumbnail or click to upload</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddScene}>Add Scene</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  )
}
