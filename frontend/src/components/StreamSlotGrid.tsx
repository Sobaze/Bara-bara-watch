
import { StreamSlot } from "./StreamSlot"
import type { StreamInfo } from "../types/stream"


type StreamGridProps = {
    streams: StreamInfo[],
    onRemoveStream: (streamId: number) => void
}


export function StreamSlotGrid( { streams }: StreamGridProps ) {

    return (
        <div className=" p-1 h-full">
            {streams.length === 0 && (
                <div className="col-span-2 h-full flex items-center justify-center text-gray-500">
                    No streams added. Use the form above to add a stream. // todo: add a button to open the form modal
                </div>
            )}
            {streams.length === 1 && (
                <div className="col-span-2 h-full flex items-center justify-center">
                    <StreamSlot stream={streams[0]} />
                </div>
            )}
            {streams.length === 2 && (
                <div className="grid h-full grid-cols-2 gap-1">
                    {streams.map((stream) => ( 
                        <div 
                            key={stream.id}
                            className="min-h-0 overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-sm"
                        >
                            <StreamSlot stream={stream} />
                        </div>
                    ))}
                </div>
            )}
            {streams.length === 3 && (
                <div className="grid h-full grid-cols-2 grid-rows-2 gap-1"> 
                    {streams.map((stream, index) => {
                        const layoutClass =
                            index === 0 ? "row-span-2 min-h-0 overflow-hidden rounded-md bg-black" :
                            "min-h-0 overflow-hidden rounded-md bg-black";
                            return (
                                <div
                                    key={stream.id}
                                    className={layoutClass}
                                >
                                    <StreamSlot stream={stream} />
                                </div>
                            )
                    })}
                </div>
            )}
            {streams.length === 4 && (
                <div className="grid h-full grid-cols-2 gap-1">
                    {streams.map((stream) => (
                        <div
                            key={stream.id}
                            className="min-h-0 overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-sm"
                        >
                            <StreamSlot stream={stream} />
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}

