'use client'

import { useAppDispatch } from '@/store/hook'
import { setOverlay } from '@/store/imageOverlaySlice'
import { useDropzone } from 'react-dropzone'
import { nanoid } from 'nanoid'
import { Button } from '@/components/ui/button'

export default function ImageUploader() {
  const dispatch = useAppDispatch()

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

  return (
    <>
      <h2 className='text-xl font-semibold'>⬆ Image Overlay</h2>
      <div
        {...getRootProps()}
        className='border border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-100 hover:bg-gray-200'
      >
        <input {...getInputProps()} />
        <p>Click or drag to upload an image overlay</p>
      </div>
    </>
  )
}
