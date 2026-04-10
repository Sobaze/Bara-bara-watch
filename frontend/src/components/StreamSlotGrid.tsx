import { useState } from "react"
import { StreamSlot } from "./StreamSlot"
import type { StreamInfo } from "../types/stream"


type StreamGridProps = {
    streams: StreamInfo[],
    onRemoveStream: (streamId: number) => void
}


export function StreamSlotGrid( { streams, onRemoveStream }: StreamGridProps ) {

    return (
        <div className="grid grid-cols-2 gap-1 p-1 h-screen">
           {streams.map((stream) => (
                <div
                    key={stream.id}
                    className="bg-gray-200 h-full flex items-center justify-center"
                >
                    <StreamSlot stream={stream} />
                </div>
            ))}
        </div>

    )
}