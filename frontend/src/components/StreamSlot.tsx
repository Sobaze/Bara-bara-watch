import { useEffect, useRef } from 'react'
import type { StreamInfo } from '../types/stream'
import { loadYouTubeIframeApi } from '../utils/loadYouTubeIframeApi'

type StreamSlotProps = {
  stream: StreamInfo
}

export function StreamSlot({ stream }: StreamSlotProps) {
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
          // events: {
          //   onReady: onPlayerReady,
          // },
        })
      }
    }
    handleYouTubeApiLoader()
    return () => {
      active = false
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [stream.videoId])

  //   function onPlayerReady(event: YouTubePlayerEvent) {
  //     event.target.playVideo()
  //   }
  //   function onStateChange(event: YouTubePlayerEvent) {}

  return <div className="h-full w-full" ref={playerFrameRef}></div>
}
