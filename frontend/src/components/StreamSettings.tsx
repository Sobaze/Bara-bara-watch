import type { StreamInfo, ActiveLayout } from "../types/stream"

type StreamsettingsProps = {
    streams: StreamInfo[],
    onRemoveStream: (streamId: string) => void,
    swapStream: (fromIndex: number, toIndex: number) => void,
    activeLayout: ActiveLayout,
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
function getSettingsGridClass(streamCount: number, layout: ActiveLayout) {
    if (streamCount === 2 && layout === 'side-by-side') {
        return 'grid grid-cols-2 gap-2'
    }
    if (streamCount === 2 && layout === 'stacked') {
        return 'grid grid-rows-2 gap-2'
    }
    if (streamCount === 3 && layout === 'main-on-left') {
        return 'grid grid-cols-2 grid-rows-2 gap-2'
    }
    if (streamCount === 3 && layout === 'main-on-top') {
        return 'grid grid-cols-2 grid-rows-2 gap-2'
    }
    if (streamCount === 4) {
        return 'grid grid-cols-2 grid-rows-2 gap-2'
    }
    return ''
}
function getStreamPositionClass(streamCount: number, layout: ActiveLayout, index: number) {
    let positionClass = ''
    if (streamCount === 3 && layout === 'main-on-left' && index === 0) {
        positionClass = 'row-span-2' 
    } if (streamCount === 3 && layout === 'main-on-top' && index === 0) {
        positionClass = 'col-span-2' 
    } 
    return positionClass
}
function getArrowPositionClass(direction: string, streamCount: number, activeLayout: ActiveLayout, currentIndex: number, targetIndex: number) {
    if (streamCount === 3 && activeLayout === 'main-on-left' && currentIndex === 0) {
        if (targetIndex === 1) {
            return 'absolute right-1 top-1/4 -translate-y-1/2'
        } if (targetIndex === 2) {
            return 'absolute right-1 top-3/4 -translate-y-1/2'
        }
    } 
    if (streamCount === 3 && activeLayout === 'main-on-top' && currentIndex === 0) {
        if (targetIndex === 1) {
            return 'absolute bottom-1 left-1/4 -translate-x-1/2'
        } if (targetIndex === 2) {
            return 'absolute bottom-1 left-3/4 -translate-x-1/2'
        }
    }
    if (direction === 'up') {
        return 'absolute top-1 left-1/2 -translate-x-1/2'
    }
    if (direction === 'down') {
        return 'absolute bottom-1 left-1/2 -translate-x-1/2'
    }
    if (direction === 'left') {
        return 'absolute left-1 top-1/2 -translate-y-1/2' 
    }
    if (direction === 'right') {
        return 'absolute right-1 top-1/2 -translate-y-1/2'
    }
    return ''

}
function getArrowLabel(direction: string, streamCount: number, activeLayout: ActiveLayout, currentIndex: number, targetIndex: number) {
    if (streamCount === 3 && activeLayout === 'main-on-left' && currentIndex === 0) {
        if (targetIndex === 1) {
            return '→'
        }
        if (targetIndex === 2) {
            return '→'
        }
    }
    if (streamCount === 3 && activeLayout === 'main-on-top' && currentIndex === 0) {
        if (targetIndex === 1) {
            return '↓'
        }
        if (targetIndex === 2) {
            return '↓'
        }
    }
    if (direction === 'up') {
        return '↑'
    }
    if (direction === 'down') {
        return '↓'
    }
    if (direction === 'left') {
        return '←'
    }
    if (direction === 'right') {
        return '→'
    }
    return ''
}
function getPreviewBoxClass(streamCount: number, layout: ActiveLayout, index: number) {
    if (streamCount === 3 && layout === 'main-on-left' && index === 0) {
        return 'h-68'
    } 
    return 'h-24'
}

export function StreamSettings({ streams, onRemoveStream, swapStream, activeLayout, }: StreamsettingsProps) {
    const baseCardClass = 'relative rounded-xl border border-white/10 bg-zinc-800 px-3 py-3'
    const containerClass = getSettingsGridClass(streams.length, activeLayout);
    const baseArrowClass = 'rounded-lg px-2 py-1 text-xs font-medium text-blue-300 transition hover:bg-blue-500/10 hover:text-blue-200'
    return (
        <div className="w-120 absolute right-1 bottom-13 rounded-2xl border border-white/10 bg-zinc-900/95 p-3 text-zinc-100 shadow-lg backdrop-blur">
            <p className="mb-3 text-sm font-semibold pb-2">Stream Settings</p>
            <div className="space-y-2">
                {streams.length === 0 && (
                    <p className="text-sm text-zinc-400 ">Add a stream to manage order and removal.</p>
                )}
                {streams.length === 1 && (
                    <div className="relative">
                        {streams.map((stream, index) => (
                            <div
                                key={stream.instanceId}
                                className={baseCardClass}
                            >
                                
                            <div className="relative min-w-0 w-full py-4 px-4">
                                <span className="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate font-medium text-zinc-300">{index + 1}. {stream.title}</span>
                                <div className="mb-2 grid h-25">
                                    <div className="rounded bg-zinc-600" />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => onRemoveStream(stream.instanceId)}
                                className="rounded-lg px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200 absolute top-7 right-6"
                            >
                                X
                            </button>
                            </div>
                        ))}
                    </div>
                )}

                {streams.length >= 2 &&  (
                    <div className={containerClass} >
                        {streams.map((stream, index) => {
                            const moveTargets = getMoveTargets(streams.length, activeLayout, index);
                            const positionClass = getStreamPositionClass(streams.length, activeLayout, index);
                            return (
                                <div
                                    key={stream.instanceId}
                                    className={`${baseCardClass} ${positionClass} `}
                                >
                                    <div className="relative min-w-0 w-full py-4 px-4">
                                        <div className={`relative mb-2 grid ${getPreviewBoxClass(streams.length, activeLayout, index)} gap-1 pl-1 pr-1`}>
                                            <span className="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate font-medium text-zinc-300">{index + 1}. {stream.title}</span>
                                             <button
                                                type="button"
                                                onClick={() => onRemoveStream(stream.instanceId)}
                                                className="rounded-lg px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200 absolute top-0.5 right-1"
                                            >
                                                X
                                            </button>
                                        <div className="rounded bg-zinc-600" />
                                    </div>
                                    </div>
                                    {moveTargets.up !== undefined && (
                                        <button
                                            type="button"
                                            onClick={() => swapStream(index, moveTargets.up!)}
                                            className={`${baseArrowClass} ${getArrowPositionClass('up', streams.length, activeLayout, index, moveTargets.up!)} `}
                                            >
                                                {getArrowLabel('up', streams.length, activeLayout, index, moveTargets.up!)}
                                            </button>)}
                                    {moveTargets.down !== undefined && (
                                        <button
                                            type="button"
                                            onClick={() => swapStream(index, moveTargets.down!)}
                                            className={`${baseArrowClass} ${getArrowPositionClass('down', streams.length, activeLayout, index, moveTargets.down!)} `}
                                            >
                                                {getArrowLabel('down', streams.length, activeLayout, index, moveTargets.down!)}
                                            </button>)}
                                    {moveTargets.left !== undefined && (
                                        <button
                                            type="button"
                                            onClick={() => swapStream(index, moveTargets.left!)}
                                            className={`${baseArrowClass} ${getArrowPositionClass('left', streams.length, activeLayout, index, moveTargets.left!)}`}
                                            >
                                                {getArrowLabel('left', streams.length, activeLayout, index, moveTargets.left!)}
                                            </button>)}
                                    {moveTargets.right !== undefined && (
                                        <button
                                            type="button"
                                            onClick={() => swapStream(index, moveTargets.right!)}
                                            className={`${baseArrowClass} ${getArrowPositionClass('right', streams.length, activeLayout, index, moveTargets.right!)}`}
                                            >
                                                {getArrowLabel('right', streams.length, activeLayout, index, moveTargets.right!)}
                                            </button>)}
                                   
                                </div>
                                )
                            })}
                        </div>
                    )}
            </div>
        </div>
    )
}
