export {}

declare global {
  type YouTubePlayer = {
    playVideo: () => void
    pauseVideo: () => void
    stopVideo: () => void
    mute: () => void
    unMute: () => void
    isMuted: () => boolean
    destroy: () => void
  }

  type YouTubePlayerEvent = {
    target: YouTubePlayer
    data?: number
  }

  type YouTubePlayerOptions = {
    videoId?: string
    playerVars?: {
      autoplay?: 0 | 1
      controls?: 0 | 1
      playsinline?: 0 | 1
      mute?: 0 | 1
      enablejsapi?: 0 | 1
      origin?: string
    }
    events?: {
      onReady?: (event: YouTubePlayerEvent) => void
      onStateChange?: (event: YouTubePlayerEvent) => void
    }
  }

  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: YouTubePlayerOptions
      ) => YouTubePlayer
    }
    onYouTubeIframeAPIReady?: () => void
  }
}
