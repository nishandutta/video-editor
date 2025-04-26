'use client'

import { useAppDispatch, useAppSelector } from '../../../store/hook'
import {
  addSubtitle,
  removeSubtitle,
  updateSubtitle,
} from '../../../store/subtitleSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SubtitleEditor() {
  const subtitles = useAppSelector((state) => state.subtitle)
  const dispatch = useAppDispatch()

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold'>💬 Subtitles & Text Overlays</h2>
      {subtitles.map((s) => (
        <div
          key={s.id}
          className='p-4 border rounded-lg flex flex-col gap-2 bg-gray-50'
        >
          <Input
            placeholder='Text'
            value={s.text}
            onChange={(e) =>
              dispatch(
                updateSubtitle({
                  id: s.id,
                  field: 'text',
                  value: e.target.value,
                })
              )
            }
          />
          <div className='flex gap-2'>
            <Input
              type='number'
              placeholder='Start (s)'
              value={s.startTime}
              onChange={(e) =>
                dispatch(
                  updateSubtitle({
                    id: s.id,
                    field: 'startTime',
                    value: Number(e.target.value),
                  })
                )
              }
            />
            <Input
              type='number'
              placeholder='End (s)'
              value={s.endTime}
              onChange={(e) =>
                dispatch(
                  updateSubtitle({
                    id: s.id,
                    field: 'endTime',
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div className='flex gap-2'>
            <select
              className='border rounded px-2 py-1'
              value={s.font}
              onChange={(e) =>
                dispatch(
                  updateSubtitle({
                    id: s.id,
                    field: 'font',
                    value: e.target.value,
                  })
                )
              }
            >
              <option value='Arial'>Arial</option>
              <option value='Courier New'>Courier New</option>
              <option value='Georgia'>Georgia</option>
              <option value='Times New Roman'>Times New Roman</option>
            </select>
            <Input
              type='number'
              placeholder='Size'
              value={s.size}
              onChange={(e) =>
                dispatch(
                  updateSubtitle({
                    id: s.id,
                    field: 'size',
                    value: Number(e.target.value),
                  })
                )
              }
            />
            <Input
              type='color'
              value={s.color}
              onChange={(e) =>
                dispatch(
                  updateSubtitle({
                    id: s.id,
                    field: 'color',
                    value: e.target.value,
                  })
                )
              }
            />
            <select
              className='border rounded px-2 py-1'
              value={s.position}
              onChange={(e) =>
                dispatch(
                  updateSubtitle({
                    id: s.id,
                    field: 'position',
                    value: e.target.value as any,
                  })
                )
              }
            >
              <option value='top'>Top</option>
              <option value='middle'>Middle</option>
              <option value='bottom'>Bottom</option>
            </select>
          </div>
          <Button
            variant='destructive'
            size='sm'
            onClick={() => dispatch(removeSubtitle(s.id))}
          >
            Delete
          </Button>
        </div>
      ))}
      <Button onClick={() => dispatch(addSubtitle())}>+ Add Subtitle</Button>
    </div>
  )
}
