import type { StreamInfo } from '../types/stream'

type StreamSlotProps = {
  stream: StreamInfo
}
export function StreamSlot({ stream }: StreamSlotProps) {
  return (
    <iframe
      src={stream.embedUrl}
      title={stream.title}
      className="w-full h-full"
      allowFullScreen
    ></iframe>
  )
}
