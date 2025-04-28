'use client'

import { Rnd } from 'react-rnd'
import { useAppDispatch, useAppSelector } from '@/store/hook'
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        const src = URL.createObjectURL(file)
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

  if (!overlay) {
    return (
      <div
        {...getRootProps()}
        className='border border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-100 hover:bg-gray-200'
      >
        <input {...getInputProps()} />
        <p>Click or drag to upload an image overlay</p>
      </div>
    )
  }

  return (
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
      style={{ zIndex: 20 }} // Ensures it stays above video
    >
      <img
        src={overlay.src}
        alt='Overlay'
        className='w-full h-full object-contain pointer-events-none'
      />
    </Rnd>
  )
}
