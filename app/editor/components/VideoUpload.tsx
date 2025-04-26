'use client'

import { useDropzone } from 'react-dropzone'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { setVideo, setProgress } from '@/store/videoSlice'
import { useEffect } from 'react'

export default function VideoUpload() {
  const dispatch = useAppDispatch()
  const { fileName, preview, progress } = useAppSelector((state) => state.video)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'video/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        const preview = URL.createObjectURL(file)
        dispatch(setVideo({ fileName: file.name, preview }))
      }
    },
  })

  useEffect(() => {
    if (preview) {
      let percent = 0
      const interval = setInterval(() => {
        percent += 10
        dispatch(setProgress(percent))
        if (percent >= 100) clearInterval(interval)
      }, 100)
    }
  }, [preview, dispatch])

  return (
    <div className='border border-dashed border-gray-400 rounded-xl p-6 w-full text-center space-y-4'>
      <div
        {...getRootProps()}
        className={`cursor-pointer py-8 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 ${
          isDragActive ? 'bg-blue-100' : ''
        }`}
      >
        <input {...getInputProps()} />
        {fileName ? (
          <p className='text-green-600 font-medium'>
            File uploaded: {fileName}
          </p>
        ) : (
          <p>Drag and drop a video file here, or click to upload</p>
        )}
      </div>

      {preview && (
        <video
          className='rounded-lg w-full max-w-md mx-auto'
          src={preview}
          controls
          width='400'
        />
      )}

      {fileName && (
        <div className='w-full max-w-md mx-auto bg-gray-300 h-3 rounded-full overflow-hidden'>
          <div
            className='bg-green-500 h-full transition-all duration-200'
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
