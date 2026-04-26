import type { StreamInfo, ActiveLayout } from "../types/stream"

type StreamsettingsProps = {
    streams: StreamInfo[],
    onRemoveStream: (streamId: number) => void,
    swapStream: (fromIndex: number, toIndex: number) => void,
    activeLayout: ActiveLayout
}
type MoveTargets = {
    up?:number,
    down?:number,
    left?:number,
    right?:number
}

function getMoveTargets(streamCount: number, layout: ActiveLayout , index: number) : MoveTargets {
    if (streamCount === 2 && layout === 'side-by-side') { 
        return twoSideBySideTargets[index] ?? {}
    }
    if (streamCount === 2 && layout === 'stacked') {
        return twoStackedTargets[index] ?? {}
    }
    if (streamCount === 3 && layout === 'main-on-left') {
        return threeMainOnLeftTargets[index] ?? {}
    }
    if (streamCount === 3 && layout === 'main-on-top') {
        return threeMainOnTopTargets[index] ?? {}
    }
    if (streamCount === 4) {
        return fourStreamTargets[index] ?? {}
    }
    return {}
}
const twoSideBySideTargets: Record<number, MoveTargets>  = {
    0: {right: 1},
    1: {left: 0}
}
const twoStackedTargets: Record<number, MoveTargets> = {
  0: { down: 1 },
  1: { up: 0 },
}
const threeMainOnLeftTargets: Record<number, MoveTargets> = {
    0: {right: 1, down: 2},
    1: {left: 0, down: 2},
    2: {left: 0, up: 1}
}
const threeMainOnTopTargets: Record<number, MoveTargets> = {
    0: {down: 1, right: 2},
    1: {up: 0, right: 2},
    2: {up: 0, left: 1}
}
const fourStreamTargets: Record<number, MoveTargets> = {
    0: {right: 1, down: 2},
    1: {left: 0, down: 3},
    2: {up: 0, right: 3},
    3: {up: 1, left: 2}
}

export function StreamSettings({ streams, onRemoveStream, swapStream, activeLayout, }: StreamsettingsProps) {
    return (
        <div className="w-120 absolute right-1 bottom-15 rounded-2xl border border-white/10 bg-zinc-900/95 p-3 text-zinc-100 shadow-lg backdrop-blur">
            <p className="mb-3 text-sm font-semibold">Stream Settings</p>
            <div className="space-y-2">
                {streams.length === 0 && (
                    <p className="text-sm text-zinc-400">Add a stream to manage order and removal.</p>
                )}
                {streams.length === 1 && (
                    <div>
                        {streams.map((stream, index) => (
                            <div
                                key={stream.id}
                                className="flex items-center rounded-xl border border-white/10 bg-zinc-800 px-3 py-2"
                            >
                                
                            <div className="min-w-0">
                                <span className="text-xs truncate font-medium text-zinc-300">{index + 1}. {stream.title}</span>
                                <div className="mb-2 grid h-14  ">
                                    <div className="rounded bg-zinc-600" />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => onRemoveStream(stream.id)}
                                className="rounded-lg px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                            >
                                Remove
                            </button>
                            </div>
                        ))}
                    </div>
                )}

                {streams.length === 2 && activeLayout === 'side-by-side' && (
                    <div className="grid grid-cols-2" >
                        {streams.map((stream, index) => {
                            const MoveTargets = getMoveTargets(streams.length, activeLayout, index);
                            return (
                                <div
                                    key={stream.id}
                                    className=" rounded-xl border relative border-white/10 bg-zinc-800 px-3 py-2"
                                >
                                    <div className="min-w-0 relative">
                                        <span className="text-xs truncate font-medium text-zinc-300">{index + 1}. {stream.title}</span>
                                        <div className="mb-2 grid h-24 gap-1">
                                            {/* <span className="text-xs absolute truncate font-medium text-zinc-300">{index + 1}. {stream.title}</span> */}
                                        <div className="rounded bg-zinc-600" />
                                    </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onRemoveStream(stream.id)}
                                        className="rounded-lg px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                                )
                            })}
                        </div>
                    )}

                {streams.length === 3 && (
                    <div>
                        {streams.map((stream, index) => {
                            const MoveTargets = getMoveTargets(streams.length, activeLayout, index);
                            return (
                            <div
                                key={stream.id}
                                className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800 px-3 py-2"
                            >
                                <div className="min-w-0">
                                   <span className="text-xs truncate font-medium text-zinc-300">{index + 1}. {stream.title}</span>
                                    <p className="text-xs text-zinc-400">Reordering goes here next</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemoveStream(stream.id)}
                                    className="rounded-lg px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                                >
                                    Remove
                                </button>
                            </div>
                            )
                        })}
                    </div>
                )}
                {streams.length === 4 && (
                    <div>
                        {streams.map((stream, index) => {
                            return (
                                <div
                                    key={stream.id}
                                    className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800 px-3 py-2"
                                >
                                    <div className="min-w-0">
                                    <span className="text-xs truncate font-medium text-zinc-300">{index + 1}. {stream.title}</span>
                                        <p className="text-xs text-zinc-400">Reordering goes here next</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onRemoveStream(stream.id)}
                                        className="rounded-lg px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )} 
            </div>
        </div>
    )
}
