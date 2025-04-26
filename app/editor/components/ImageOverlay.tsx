'use client'

import { Rnd } from 'react-rnd'
import { useAppDispatch, useAppSelector } from '../../../store/hook'
import {
  setOverlay,
  updateOverlay,
  clearOverlay,
} from '@/store/imageOverlaySlice'
import { useDropzone } from 'react-dropzone'
import { nanoid } from 'nanoid'
import { Button } from '@/components/ui/button'

export default function ImageOverlay() {
  const dispatch = useAppDispatch()
  const overlay = useAppSelector((state) => state.imageOverlay)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: async (files) => {
      const file = files[0]
      if (file) {
        const src = URL.createObjectURL(file)
        // Optionally you can read natural width/height
        const img = new Image()
        img.src = src
        img.onload = () => {
          dispatch(
            setOverlay({
              id: nanoid(),
              src,
              width: img.width / 4,
              height: img.height / 4,
            })
          )
        }
      }
    },
  })

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold'>🖼️ Image Overlay</h2>

      {!overlay ? (
        <div
          {...getRootProps()}
          className={`border border-dashed rounded-lg p-6 text-center cursor-pointer ${
            isDragActive ? 'bg-blue-50' : 'bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to upload</p>
        </div>
      ) : (
        <div className='relative w-full max-w-2xl aspect-video border border-gray-300 rounded-lg overflow-hidden'>
          {/* Base preview/video layer */}
          <div className='absolute inset-0 bg-black opacity-10' />

          {/* Draggable & Resizable Overlay */}
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
          >
            <img
              src={overlay.src}
              alt='Overlay'
              className='w-full h-full object-contain pointer-events-none'
            />
          </Rnd>

          <Button
            variant='destructive'
            size='sm'
            className='absolute top-2 right-2'
            onClick={() => dispatch(clearOverlay())}
          >
            Remove Overlay
          </Button>
        </div>
      )}
    </div>
  )
}
