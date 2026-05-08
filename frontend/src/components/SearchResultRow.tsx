import type { SearchResultInfo } from '../types/stream'

type SearchResultRowProps = {
  stream: SearchResultInfo
  onAddSearchResult: (result: SearchResultInfo) => void
  streamCount: number
}
function formatViewNumbers(viewCount?: string) {
  const num = Number(viewCount)
  if (isNaN(num)) return viewCount // Return original string if it's not a number
  return num.toLocaleString('sv-SE')
}

export function SearchResultRow({
  stream,
  streamCount,
  onAddSearchResult,
}: SearchResultRowProps) {
  return (
    <div className="border-b py-2 flex items-center gap-4">
      <img
        src={stream.thumbnailUrl}
        alt={stream.title}
        className="ml-2 mb-1 h-30 w-38 shrink-0 object-cover rounded-md"
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold flex truncate text-sm">{stream.title}</h3>
        <p className="mt-1 flex text-xs text-zinc-400">{stream.channelName}</p>
        {!stream.isLive && stream.viewCount ? (
          <span className="mt-1 flex text-xs text-zinc-400">
            {formatViewNumbers(stream.viewCount)} views
          </span>
        ) : stream.isLive && stream.currentViewers ? (
          <span className="mt-1 flex text-xs text-zinc-400">
            {formatViewNumbers(stream.currentViewers)} viewers
          </span>
        ) : null}
        {stream.description && (
          <p className="mt-1 flex truncate text-sm text-zinc-400">
            {stream.description}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
          {stream.isLive && (
            <span className="rounded-full bg-red-500/15 px-2 py-0.5 font-medium text-red-400">
              Live
            </span>
          )}
        </div>
      </div>
      {streamCount < 4 && (
        <button
          onClick={() => onAddSearchResult(stream)}
          className="shrink-0 mr-2 py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Stream
        </button>
      )}
    </div>
  )
}
