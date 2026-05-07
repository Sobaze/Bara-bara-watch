import { useEffect, useRef, useState } from 'react'
import { StreamSlotGrid } from './StreamSlotGrid'
import type { StreamInfo } from '../types/stream'
import type {
  ActiveLayout,
  LayoutMode,
  TwoStreamLayout,
  ThreeStreamLayout,
} from '../types/stream'
import { StreamSettings } from './StreamSettings'
import { StreamLayoutSelector } from './StreamLayoutSelector'

type WatchroomProps = {
  streams: StreamInfo[]
  onRemoveStream: (streamId: string) => void
  onSwapStream: (fromIndex: number, toIndex: number) => void
}

export function Watchroom({
  streams,
  onRemoveStream,
  onSwapStream,
}: WatchroomProps) {
  const fullScreenRef = useRef<HTMLDivElement>(null)
  const hideControlsTimeoutRef = useRef<number | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isLayoutSelectorOpen, setIsLayoutSelectorOpen] = useState(false)
  const [isStreamSettingsOpen, setIsStreamSettingsOpen] = useState(false)

  const [twoStreamLayout, setTwoStreamLayout] =
    useState<TwoStreamLayout>('side-by-side')
  const [threeStreamLayout, setThreeStreamLayout] =
    useState<ThreeStreamLayout>('main-on-left')

  const canChangeLayout = streams.length === 2 || streams.length === 3
  const activeLayout: ActiveLayout =
    streams.length === 2
      ? twoStreamLayout
      : streams.length === 3
        ? threeStreamLayout
        : null
  const layoutMode: LayoutMode =
    streams.length === 2 ? '2-stream' : streams.length === 3 ? '3-stream' : null

  useEffect(() => {
    function handleFullScreenChange() {
      setIsFullScreen(document.fullscreenElement === fullScreenRef.current)
    }
    document.addEventListener('fullscreenchange', handleFullScreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [])

  function handleFullScreenStream() {
    fullScreenRef.current?.requestFullscreen()
  }

  function handleExitFullScreen() {
    document.exitFullscreen()
  }

  useEffect(() => {
    return () => {
      if (hideControlsTimeoutRef.current) {
        window.clearTimeout(hideControlsTimeoutRef.current)
      }
    }
  }, [])

  function handleMouseMove() {
    if (hideControlsTimeoutRef.current) {
      window.clearTimeout(hideControlsTimeoutRef.current)
    }
    hideControlsTimeoutRef.current = window.setTimeout(() => {
      setIsLayoutSelectorOpen(false)
      setIsStreamSettingsOpen(false)
    }, 2000)
  }

  function handleMouseLeave() {
    setIsLayoutSelectorOpen(false)
    setIsStreamSettingsOpen(false)
  }

  function handleOpenLayoutSelector() {
    setIsLayoutSelectorOpen(true)
    setIsStreamSettingsOpen(false)
  }

  function handleOpenStreamSettings() {
    setIsStreamSettingsOpen(true)
    setIsLayoutSelectorOpen(false)
  }

  function handleSelectLayout2Streams(layout: TwoStreamLayout) {
    setTwoStreamLayout(layout)
  }

  function handleSelectLayout3Streams(layout: ThreeStreamLayout) {
    setThreeStreamLayout(layout)
  }

  return (
    <div
      ref={fullScreenRef}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative flex h-[93dvh] flex-col overflow-hidden rounded-2xl bg-zinc-950"
    >
      <div className="h-full">
        {<StreamSlotGrid streams={streams} layout={activeLayout} />}
      </div>
      <div className={`absolute bottom-2 right-2 z-20 flex items-end`}>
        {isLayoutSelectorOpen && canChangeLayout && (
          <div onMouseLeave={() => setIsLayoutSelectorOpen(false)}>
            <StreamLayoutSelector
              layoutMode={layoutMode}
              onSelectLayout2Streams={handleSelectLayout2Streams}
              onSelectLayout3Streams={handleSelectLayout3Streams}
            />
          </div>
        )}
        {isStreamSettingsOpen && (
          <div onMouseLeave={() => setIsStreamSettingsOpen(false)}>
            <StreamSettings
              streams={streams}
              onRemoveStream={onRemoveStream}
              onSwapStream={onSwapStream}
              activeLayout={activeLayout}
            />
          </div>
        )}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/85 p-2 shadow-lg backdrop-blur">
          {canChangeLayout && (
            <button
              type="button"
              onMouseEnter={handleOpenLayoutSelector}
              className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
            >
              Layout
            </button>
          )}
          <button
            type="button"
            onMouseEnter={handleOpenStreamSettings}
            className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
          >
            Streams
          </button>
          <button
            type="button"
            onClick={
              isFullScreen ? handleExitFullScreen : handleFullScreenStream
            }
            className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
      </div>
    </div>
  )
}
