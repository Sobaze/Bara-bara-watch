import type { StreamInfo } from "../types/stream"

type StreamsettingsProps = {
    streams: StreamInfo[],
    onRemoveStream: (streamId: number) => void
}

export function StreamSettings({ streams, onRemoveStream }: StreamsettingsProps) {
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
                                className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800 px-3 py-2"
                            >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-zinc-100">{index + 1}. {stream.title}</p>
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
                        ))}
                    </div>
                )}

                {streams.length === 2 && (
                    <div>
                        {streams.map((stream, index) => (
                            <div
                                key={stream.id}
                                className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800 px-3 py-2"
                            >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-zinc-100">{index + 1}. {stream.title}</p>
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
                        ))}
                    </div>
                )}

                {streams.length === 3 && (
                    <div>
                        {streams.map((stream, index) => (
                        <div
                            key={stream.id}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800 px-3 py-2"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-zinc-100">{index + 1}. {stream.title}</p>
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
                    ))}
                    </div>
                )}
                {streams.length === 4 && (
                    <div>
                        {streams.map((stream, index) => (
                        <div
                            key={stream.id}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800 px-3 py-2"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-zinc-100">{index + 1}. {stream.title}</p>
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
                    ))}
                    </div>
                )}      
                {/* {streams.map((stream, index) => (
                    <div
                        key={stream.id}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800 px-3 py-2"
                    >
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-zinc-100">{index + 1}. {stream.title}</p>
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
                ))} */}
            </div>
        </div>
    )
}
