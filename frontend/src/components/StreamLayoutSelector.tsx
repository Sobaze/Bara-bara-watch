import type { LayoutMode, ThreeStreamLayout, TwoStreamLayout } from "../types/stream"

type StreamLayoutSelectorProps = {
    onSelectLayout2Streams: (layout: TwoStreamLayout) => void,
    onSelectLayout3Streams: (layout: ThreeStreamLayout) => void,
    
    layoutMode: LayoutMode
}

export function StreamLayoutSelector( { onSelectLayout2Streams, onSelectLayout3Streams, layoutMode }: StreamLayoutSelectorProps) {


    return (
        <div>
            {layoutMode === '2-stream' && (
                <div className="w-120 absolute right-1 bottom-15  rounded-2xl border border-white/10 bg-zinc-900/95 p-3 text-zinc-100 shadow-lg backdrop-blur">
                    <p className="mb-10 pb-4 text-sm font-semibold">Layout Options</p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-left transition hover:border-white/20 hover:bg-zinc-700"
                            onClick={() => onSelectLayout2Streams('side-by-side')}
                        >
                            <div className="mb-2 grid h-14 grid-cols-2 gap-1">
                                <div className="rounded bg-zinc-600" />
                                <div className="rounded bg-zinc-600" />
                            </div>
                            <span className="text-xs text-zinc-300">Side by side</span>
                        </button>
                        <button
                            type="button"
                            className="rounded-xl w-70% border border-white/10 bg-zinc-800 p-3 text-left transition hover:border-white/20 hover:bg-zinc-700"
                            onClick={() => onSelectLayout2Streams('stacked')}
                        >
                            <div className="mb-2 grid h-14 grid-rows-2 gap-1">
                                <div className="rounded bg-zinc-600" />
                                <div className="rounded bg-zinc-600" />
                            </div>
                            <span className="text-xs text-zinc-300">Stacked</span>
                        </button>
                    </div>
                </div>
            )}
            {layoutMode === '3-stream' && (
                <div className="w-w-120 absolute right-1 bottom-15 h-[min(22rem,36vw)] rounded-2xl border border-white/10 bg-zinc-900/95 p-3 text-zinc-100 shadow-lg backdrop-blur">
                    <p className="mb-3 text-sm font-semibold">Layout Options</p>
                    <div className="grid grid-cols-2 gap-2">
                       
                        <button
                            type="button"
                            className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-left transition hover:border-white/20 hover:bg-zinc-700"
                            onClick={() => onSelectLayout3Streams('main-on-left')}
                        >
                            <div className="mb-2 grid h-14 grid-rows-2 grid-cols-2 gap-1">
                                <div className="rounded bg-zinc-600 row-span-2" />
                                <div className="rounded bg-zinc-600" />
                                <div className="rounded bg-zinc-600" />
                            </div>
                            <span className="text-xs text-zinc-300">Main on Left</span>
                        </button>
                         <button
                            type="button"
                            className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-left transition hover:border-white/20 hover:bg-zinc-700"
                            onClick={() => onSelectLayout3Streams('main-on-top')}
                        >
                            <div className="mb-2 grid h-14 grid-cols-2 grid-rows-2 gap-1">
                                <div className="rounded bg-zinc-600 col-span-2" />
                                <div className="rounded bg-zinc-600" />
                                <div className="rounded bg-zinc-600" />
                            </div>
                            <span className="text-xs text-zinc-300">Main on Top</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )   
}


