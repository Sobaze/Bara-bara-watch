import type { StreamInfo } from "../types/stream"

type StreamSlotProps = {
    stream: StreamInfo,
}
export function StreamSlot({ stream}: StreamSlotProps) {
    return (
        <iframe
            src={stream.url}
            title={stream.title}
            className="w-full h-full"
            allowFullScreen
        ></iframe>
    )
}