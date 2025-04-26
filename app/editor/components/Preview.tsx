'use client'

import { useAppSelector } from '../../../store/hook'

export default function Preview() {
  const { preview } = useAppSelector((state) => state.video)
  const subtitles = useAppSelector((state) => state.subtitle)
  // const image = useAppSelector((state) => state.imageOverlay)

  return (
    <div className='relative w-full max-w-2xl aspect-video border border-gray-300 rounded-lg overflow-hidden'>
      {/* {image.url && (
        <div
          style={{
            position: 'absolute',
            top: image.position.y,
            left: image.position.x,
            width: image.size.width,
            height: image.size.height,
            opacity: image.opacity,
            border: image.border ? '2px solid red' : 'none',
            backgroundImage: `url(${image.url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
          }}
        />
      )} */}
      {preview ? (
        <>
          <video
            src={preview}
            controls
            className='w-full h-full object-cover'
          />
          {/* Subtitle overlays */}
          {subtitles.map((s) => (
            <div
              key={s.id}
              style={{
                fontFamily: s.font,
                fontSize: `${s.size}px`,
                color: s.color,
              }}
              className={`absolute w-full text-center px-2 ${
                s.position === 'top'
                  ? 'top-4'
                  : s.position === 'middle'
                  ? 'top-1/2 -translate-y-1/2'
                  : 'bottom-4'
              } pointer-events-none`}
            >
              <p>{s.text}</p>
            </div>
          ))}
        </>
      ) : (
        <div className='flex items-center justify-center h-full text-gray-400 text-xl'>
          Upload a video to preview
        </div>
      )}
    </div>
  )
}
