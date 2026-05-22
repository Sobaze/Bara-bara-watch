import { useEffect, useRef } from 'react'
import type { StreamInfo } from '../types/stream'
import type { StreamControls } from '../types/streamControls'
import { loadYouTubeIframeApi } from '../utils/loadYouTubeIframeApi'

type StreamSlotProps = {
  stream: StreamInfo
  registerStreamControls: (
    instanceId: string,
    streamControls: StreamControls
  ) => void
  unregisterStreamControl: (instanceId: string) => void
}

export function StreamSlot({
  stream,
  registerStreamControls,
  unregisterStreamControl,
}: StreamSlotProps) {
  const playerFrameRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YouTubePlayer | null>(null)

  useEffect(() => {
    let active = true
    async function handleYouTubeApiLoader() {
      if (playerFrameRef.current == null) {
        return
      }
      await loadYouTubeIframeApi()
      if (active === false) {
        return
      }

      if (playerFrameRef.current == null) {
        return
      }
      if (window.YT?.Player) {
        playerRef.current = new window.YT.Player(playerFrameRef.current, {
          videoId: stream.videoId,
        })
        registerStreamControls(stream.instanceId, {
          toggleMute() {
            if (playerRef.current) {
              if (playerRef.current.isMuted() === true) {
                playerRef.current.unMute()
              } else {
                playerRef.current.mute()
              }
            }
          },
          play() {
            if (playerRef.current) {
              playerRef.current.playVideo()
            }
          },
          pause() {
            if (playerRef.current) {
              playerRef.current.pauseVideo()
            }
          },
        })
      }
    }
    handleYouTubeApiLoader()
    return () => {
      active = false
      unregisterStreamControl(stream.instanceId)
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [
    stream.videoId,
    stream.instanceId,
    registerStreamControls,
    unregisterStreamControl,
  ])

  return <div className="h-full w-full" ref={playerFrameRef}></div>
}
