import { useCallback, useEffect, useRef, useState } from 'react'
import { StreamSlotGrid } from './StreamSlotGrid'
import type { StreamInfo } from '../types/stream'
import type {
  ActiveLayout,
  LayoutMode,
  TwoStreamLayout,
  ThreeStreamLayout,
} from '../types/stream'
import type { StreamControls } from '../types/streamControls'
import { StreamSettings } from './StreamSettings'
import { StreamLayoutSelector } from './StreamLayoutSelector'
import { Shortcuts } from './Shortcuts'

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
  const streamControlsRef = useRef<Record<string, StreamControls>>({})
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isLayoutSelectorOpen, setIsLayoutSelectorOpen] = useState(false)
  const [isStreamSettingsOpen, setIsStreamSettingsOpen] = useState(false)
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)

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

  const registerStreamControls = useCallback(
    (instanceId: string, controls: StreamControls) => {
      streamControlsRef.current[instanceId] = controls
    },
    []
  )
  const unregisterStreamControl = useCallback((instanceId: string) => {
    delete streamControlsRef.current[instanceId]
  }, [])

  useEffect(() => {
    const allowedKeys = ['1', '2', '3', '4']
    function keyDownListener(e: KeyboardEvent) {
      const target = e.target
      if (!(target instanceof HTMLElement)) {
        return
      }
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target.isContentEditable
      ) {
        return
      }

      if (allowedKeys.includes(e.key)) {
        const keyToIndex = +e.key - 1
        if (!streams[keyToIndex]) {
          return
        }
        const streamId = streams[keyToIndex].instanceId
        const controls = streamControlsRef.current[streamId]
        if (!controls) {
          return
        }
        controls.toggleMute()
      }
      if (e.key === 'p') {
        for (const stream of streams) {
          const streamId = stream.instanceId
          const controls = streamControlsRef.current[streamId]
          if (controls) {
            controls.play()
          }
        }
      }
      if (e.key === 's') {
        for (const stream of streams) {
          const streamId = stream.instanceId
          const controls = streamControlsRef.current[streamId]
          if (controls) {
            controls.pause()
          }
        }
      }
    }
    document.addEventListener('keydown', keyDownListener)

    return () => {
      document.removeEventListener('keydown', keyDownListener)
    }
  }, [streams])

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

  function handleOpenLayoutSelector() {
    setIsLayoutSelectorOpen(true)
    setIsStreamSettingsOpen(false)
    setIsShortcutsOpen(false)
  }

  function handleOpenStreamSettings() {
    setIsStreamSettingsOpen(true)
    setIsLayoutSelectorOpen(false)
    setIsShortcutsOpen(false)
  }
  function handleOpenShortcuts() {
    setIsShortcutsOpen(true)
    setIsStreamSettingsOpen(false)
    setIsLayoutSelectorOpen(false)
  }

  function showControls() {
    clearHideControlsTimeout()
    setControlsVisible(true)
  }

  function hideControls() {
    clearHideControlsTimeout()
    closePanels()
    if (!isFullScreen) {
      return
    }
    setControlsVisible(false)
  }

  function closePanels() {
    setIsLayoutSelectorOpen(false)
    setIsStreamSettingsOpen(false)
    setIsShortcutsOpen(false)
  }

  function scheduleHideControls() {
    clearHideControlsTimeout()
    if (!isFullScreen) {
      return
    }
    if (isLayoutSelectorOpen || isStreamSettingsOpen || isShortcutsOpen) {
      return
    }
    hideControlsTimeoutRef.current = window.setTimeout(() => {
      setControlsVisible(false)
      hideControlsTimeoutRef.current = null
    }, 2000)
  }

  function clearHideControlsTimeout() {
    if (hideControlsTimeoutRef.current) {
      window.clearTimeout(hideControlsTimeoutRef.current)
      hideControlsTimeoutRef.current = null
    }
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
      className="relative flex h-[calc(100dvh-4rem)] flex-col overflow-hidden rounded-2xl bg-zinc-950"
    >
      <div className="h-full">
        <StreamSlotGrid
          streams={streams}
          layout={activeLayout}
          registerStreamControls={registerStreamControls}
          unregisterStreamControl={unregisterStreamControl}
        />
      </div>
      <div
        className={`absolute bottom-0 right-2 z-20 flex h-16 w-96 items-end justify-end `}
        onPointerEnter={showControls}
        onPointerLeave={hideControls}
        onFocusCapture={showControls}
        onBlurCapture={scheduleHideControls}
      >
        <div
          className={`transition-opacity duration-300 ${
            controlsVisible || !isFullScreen ? 'opacity-100' : 'opacity-0'
          }`}
        >
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
          {isShortcutsOpen && (
            <div onMouseLeave={() => setIsShortcutsOpen(false)}>
              <Shortcuts />
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
              onMouseEnter={handleOpenShortcuts}
              className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
            >
              Shortcuts
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
    </div>
  )
}
