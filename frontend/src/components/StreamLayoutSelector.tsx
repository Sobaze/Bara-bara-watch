
export function StreamLayoutSelector() {
    return (
        <div className="w-64 rounded-2xl border border-white/10 bg-zinc-900/95 p-3 text-zinc-100 shadow-lg backdrop-blur">
            <p className="mb-3 text-sm font-semibold">Layout Options</p>
            <div className="grid grid-cols-2 gap-2">
                <button
                    type="button"
                    className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-left transition hover:border-white/20 hover:bg-zinc-700"
                >
                    <div className="mb-2 grid h-14 grid-cols-2 gap-1">
                        <div className="rounded bg-zinc-600" />
                        <div className="rounded bg-zinc-600" />
                    </div>
                    <span className="text-xs text-zinc-300">Side by side</span>
                </button>
                <button
                    type="button"
                    className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-left transition hover:border-white/20 hover:bg-zinc-700"
                >
                    <div className="mb-2 grid h-14 grid-rows-2 gap-1">
                        <div className="rounded bg-zinc-600" />
                        <div className="rounded bg-zinc-600" />
                    </div>
                    <span className="text-xs text-zinc-300">Stacked</span>
                </button>
            </div>
        </div>
    )   
}
