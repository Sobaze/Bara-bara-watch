let apiReadyPromise: Promise<void> | null = null

export function loadYouTubeIframeApi(): Promise<void> {
  if (window.YT?.Player) {
    return Promise.resolve()
  }

  if (apiReadyPromise) {
    return apiReadyPromise
  }

  apiReadyPromise = new Promise((resolve, reject) => {
    window.onYouTubeIframeAPIReady = () => {
      resolve()
    }
    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    )

    if (existingScript) {
      return
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'

    tag.onerror = () => {
      apiReadyPromise = null
      reject(new Error('Failed to load YouTube Iframe API'))
    }

    document.body.appendChild(tag)
  })

  return apiReadyPromise
}
