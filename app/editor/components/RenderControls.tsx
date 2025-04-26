'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function RenderControls() {
  const [isRendering, setIsRendering] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const handleRender = () => {
    setIsRendering(true)
    setTimeout(() => {
      setIsRendering(false)
      setIsReady(true)
    }, 2000) // simulate 2s render
  }

  const handleDownload = () => {
    alert('Mock download triggered 🎉')
  }

  return (
    <div className='space-x-4'>
      <Button onClick={handleRender} disabled={isRendering}>
        {isRendering ? (
          <>
            <Loader2 className='animate-spin mr-2 h-4 w-4' />
            Rendering...
          </>
        ) : (
          'Render Video'
        )}
      </Button>

      <Button onClick={handleDownload} disabled={!isReady}>
        Download Video
      </Button>
    </div>
  )
}
