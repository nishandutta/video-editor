'use client'

import { useAppSelector } from '@/store/hook'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'

export default function RenderVideoButton() {
  const { preview, fileName } = useAppSelector((state) => state.video)
  const [rendering, setRendering] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (rendering) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setRendering(false)
            setCompleted(true)
            return 100
          }
          return prev + 5
        })
      }, 300) // speed of progress
    }
    return () => clearInterval(interval)
  }, [rendering])

  const handleRender = () => {
    if (!preview) {
      alert('Please upload a video first!')
      return
    }
    setRendering(true)
    setProgress(0)
    setCompleted(false)
  }

  const handleDownload = () => {
    if (!preview) {
      alert('No video to download.')
      return
    }
    const a = document.createElement('a')
    a.href = preview
    a.download = fileName || 'rendered-video.mp4'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className='flex flex-col items-center space-y-6 mt-6'>
      <Button onClick={handleRender} disabled={rendering}>
        {rendering ? 'Rendering...' : 'Render Video'}
      </Button>

      {rendering && (
        <div className='w-full max-w-md'>
          <Progress value={progress} />
          <div className='text-center text-sm mt-2 text-gray-600'>
            {progress}%
          </div>
        </div>
      )}

      {/* Dialog After Completion */}
      <Dialog open={completed} onOpenChange={setCompleted}>
        <DialogContent className='max-w-md text-center'>
          <DialogHeader>
            <DialogTitle>🎉 Render Complete!</DialogTitle>
          </DialogHeader>

          <div className='py-4'>Your video has been rendered successfully.</div>

          <DialogFooter className='flex flex-col space-y-4'>
            <Button onClick={handleDownload}>📥 Download Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
