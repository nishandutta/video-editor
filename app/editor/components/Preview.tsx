'use client'

import { useAppSelector } from '@/store/hook'
import { useRef, useState, useEffect } from 'react'
import ImageOverlay from './ImageOverlay'
import ImageUploader from './ImageUploader'

export default function Preview() {
  const { preview } = useAppSelector((state) => state.video)
  const subtitles = useAppSelector((state) => state.subtitle)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      const t = video.currentTime
      setCurrentTime(t)
      // Debug
      console.log('▶️ currentTime:', t.toFixed(2))
      console.log(
        '📝 activeSubs:',
        subtitles.filter((s) => t >= s.startTime && t <= s.endTime)
      )
    }

    video.addEventListener('timeupdate', onTimeUpdate)
    return () => video.removeEventListener('timeupdate', onTimeUpdate)
  }, [subtitles])

  // Compute which subs to show
  const activeSubtitles = subtitles.filter(
    (s) => currentTime >= s.startTime && currentTime <= s.endTime
  )

  return (
    <div className='relative w-full max-w-2xl aspect-video border rounded-lg overflow-hidden'>
      {preview ? (
        <>
          <video
            ref={videoRef}
            src={preview}
            controls
            className='w-full h-full object-cover'
          />

          {activeSubtitles.map((s) => (
            <div
              key={s.id}
              style={{
                fontFamily: s.font,
                fontSize: `${s.size}px`,
                color: s.color || 'yellow',
                zIndex: 10, // ensure on top
              }}
              className={`absolute w-full text-center px-2 ${
                s.position === 'top'
                  ? 'top-4'
                  : s.position === 'middle'
                  ? 'top-1/2 -translate-y-1/2'
                  : 'bottom-4'
              } pointer-events-none`}
            >
              {s.text}
            </div>
          ))}
          <ImageOverlay />
        </>
      ) : (
        <div className='flex items-center justify-center h-full text-gray-400 text-xl'>
          Upload a video to preview
        </div>
      )}
    </div>
  )
}
