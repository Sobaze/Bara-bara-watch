
import { StreamSlot } from "./StreamSlot"
import type { StreamInfo } from "../types/stream"


type StreamGridProps = {
    streams: StreamInfo[],
    layout?: 'side-by-side' | 'stacked' | 'main-on-top' | 'main-on-left' | null
}


export function StreamSlotGrid( { streams, layout }: StreamGridProps ) {

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
                <div  className={layout === 'side-by-side' ? "grid h-full grid-cols-2 gap-1" : layout === 'stacked' ? "grid h-full grid-rows-2 gap-1" : "grid h-full grid-cols-2 gap-1"}>
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
                        const baseLayout = "min-h-0 overflow-hidden rounded-md bg-black";
                        const layoutClass = layout === 'main-on-top' ? index === 0 ? "col-span-2" : "" : 
                        layout === 'main-on-left' ? index === 0 ? "row-span-2" : "" : "";
                        
                            return (
                                <div
                                    key={stream.id}
                                    className={`${baseLayout} ${layoutClass} `}
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

