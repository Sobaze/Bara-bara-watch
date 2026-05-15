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
    async function handleYouTubeApiLoader() {
      if (playerFrameRef.current == null) {
        return
      }
      await loadYouTubeIframeApi()
      playerRef.current = new window.YT?.Player(playerFrameRef.current, {
        videoId: stream.videoId
      })
    }
    return () => {
        if (playerRef.current) {
            playerRef.current.destroy()
            playerRef.current = null
        }
    }
  }, [])

  function onPlayerReady(event: YouTubePlayerEvent) {
    event.target.playVideo()
  }
  function onStateChange(event: YouTubePlayerEvent) {
    
  }

  return <div ref={playerFrameRef}></div>
}
