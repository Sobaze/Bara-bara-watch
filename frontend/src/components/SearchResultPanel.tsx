

import type { StreamInfo } from '../types/stream'

type SearchResultPanelProps = {
    setModalState: (visible: boolean) => void
    searchResults: StreamInfo[]
    handleAddStreams: (newStreams: StreamInfo[]) => void
}


export function SearchResultPanel({ setModalState, searchResults, handleAddStreams }: SearchResultPanelProps) {

    function handleClose() {
        setModalState(false)
    }

    return (
        <div className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 text-zinc-100 shadow-xl">
            <div className="max-h-80 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Search Results</h2>
                {searchResults.length > 0 ? (
                    searchResults.map(stream => (
                        <div key={stream.id} className="border-b py-2">
                            <h3 className="font-semibold">{stream.title}</h3>
                            <p>{stream.url}</p>
                            <button onClick={() => handleAddStreams([stream])} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                Add to Watchroom
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="px-4 py-3 text-sm text-zinc-400">No results found.</p>
                )}
                
                <button
                    onClick={handleClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    )
}