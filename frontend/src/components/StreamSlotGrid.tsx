import { StreamSlot } from './StreamSlot'
import type { ActiveLayout, StreamInfo } from '../types/stream'
import type { StreamControls } from '../types/streamControls'

type StreamGridProps = {
  streams: StreamInfo[]
  layout?: ActiveLayout
  registerStreamControls: (
    instanceId: string,
    streamControls: StreamControls
  ) => void
  unregisterStreamControl: (instanceId: string) => void
}

export function StreamSlotGrid({
  streams,
  layout,
  registerStreamControls,
  unregisterStreamControl,
}: StreamGridProps) {
  return (
    <div className="p-1 h-full">
      {streams.length === 0 && (
        <div className="col-span-2 h-full flex items-center justify-center text-gray-500">
          No streams added. Search for a Stream and add it.
        </div>
      )}
      {streams.length === 1 && (
        <div className="col-span-2 h-full min-h-0 overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-sm">
          <StreamSlot
            stream={streams[0]}
            registerStreamControls={registerStreamControls}
            unregisterStreamControl={unregisterStreamControl}
          />
        </div>
      )}
      {streams.length === 2 && (
        <div
          className={
            layout === 'side-by-side'
              ? 'grid h-full grid-cols-2'
              : layout === 'stacked'
                ? 'grid h-full grid-rows-2'
                : 'grid h-full grid-cols-2'
          }
        >
          {streams.map((stream) => (
            <div
              key={stream.instanceId}
              className="min-h-0 overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-sm"
            >
              <StreamSlot
                stream={stream}
                registerStreamControls={registerStreamControls}
                unregisterStreamControl={unregisterStreamControl}
              />
            </div>
          ))}
        </div>
      )}
      {streams.length === 3 && (
        <div className="grid h-full grid-cols-2 grid-rows-2">
          {streams.map((stream, index) => {
            const baseLayout =
              'min-h-0 overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-sm'
            const layoutClass =
              layout === 'main-on-top'
                ? index === 0
                  ? 'col-span-2'
                  : ''
                : layout === 'main-on-left'
                  ? index === 0
                    ? 'row-span-2'
                    : ''
                  : ''

            return (
              <div
                key={stream.instanceId}
                className={`${baseLayout} ${layoutClass}`}
              >
                <StreamSlot
                  stream={stream}
                  registerStreamControls={registerStreamControls}
                  unregisterStreamControl={unregisterStreamControl}
                />
              </div>
            )
          })}
        </div>
      )}
      {streams.length === 4 && (
        <div className="grid h-full grid-cols-2 grid-rows-2">
          {streams.map((stream) => (
            <div
              key={stream.instanceId}
              className="min-h-0 overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-sm"
            >
              <StreamSlot
                stream={stream}
                registerStreamControls={registerStreamControls}
                unregisterStreamControl={unregisterStreamControl}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
