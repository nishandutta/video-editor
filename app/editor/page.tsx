import VideoUpload from './components/VideoUpload'
import Timeline from './components/Timeline'
import AudioEditor from './components/AudioEditor'
import SubtitleEditor from './components/SubtitleEditor'
import Preview from './components/Preview'
import RenderControls from './components/RenderControls'
import ImageOverlay from './components/ImageOverlay'

export default function EditorPage() {
  return (
    <div className='p-6 space-y-10 max-w-5xl mx-auto'>
      <h1 className='text-3xl font-bold'>🎬 Video Editor</h1>
      <VideoUpload />
      <Timeline />
      <AudioEditor />
      <SubtitleEditor />
      <ImageOverlay />
      <Preview />
      <RenderControls />
    </div>
  )
}
