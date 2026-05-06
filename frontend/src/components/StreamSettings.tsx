import type { StreamInfo, ActiveLayout } from '../types/stream'

import {
  getMoveTargets,
  getSettingsGridClass,
  getStreamPositionClass,
  getArrowPositionClass,
  getArrowLabel,
  getPreviewBoxClass,
} from '../utils/streamSettingsLayout'

type StreamsettingsProps = {
  streams: StreamInfo[]
  onRemoveStream: (streamId: string) => void
  swapStream: (fromIndex: number, toIndex: number) => void
  activeLayout: ActiveLayout
}

export function StreamSettings({
  streams,
  onRemoveStream,
  swapStream,
  activeLayout,
}: StreamsettingsProps) {
  const baseCardClass =
    'relative rounded-xl border border-white/10 bg-zinc-800 px-3 py-3'
  const containerClass = getSettingsGridClass(streams.length, activeLayout)
  const baseArrowClass =
    'rounded-lg px-2 py-1 text-xs font-medium text-blue-300 transition hover:bg-blue-500/10 hover:text-blue-200'
  return (
    <div className="w-120 absolute right-1 bottom-13 rounded-2xl border border-white/10 bg-zinc-900/95 p-3 text-zinc-100 shadow-lg backdrop-blur">
      <p className="mb-3 text-sm font-semibold pb-2">Stream Settings</p>
      <div className="space-y-2">
        {streams.length === 0 && (
          <p className="text-sm text-zinc-400 ">
            Add a stream to manage order and removal.
          </p>
        )}
        {streams.length === 1 && (
          <div className="relative">
            {streams.map((stream, index) => (
              <div key={stream.instanceId} className={baseCardClass}>
                <div className="relative min-w-0 w-full py-4 px-4">
                  <span className="absolute left-4 right-11 top-1/2 -translate-y-1/2 truncate text-xs pl-2 font-medium text-zinc-300">
                    {index + 1}. {stream.title}
                  </span>
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

        {streams.length >= 2 && (
          <div className={containerClass}>
            {streams.map((stream, index) => {
              const moveTargets = getMoveTargets(
                streams.length,
                activeLayout,
                index
              )
              const positionClass = getStreamPositionClass(
                streams.length,
                activeLayout,
                index
              )
              return (
                <div
                  key={stream.instanceId}
                  className={`${baseCardClass} ${positionClass} `}
                >
                  <div className="relative min-w-0 w-full py-4 px-4">
                    <div
                      className={`relative mb-2 grid ${getPreviewBoxClass(streams.length, activeLayout, index)} gap-1 pl-1 pr-1`}
                    >
                      <span className="absolute left-3 right-10 top-1/2 -translate-y-1/2 truncate text-xs pl-2 font-medium text-zinc-300">
                        {index + 1}. {stream.title}
                      </span>
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
                      {getArrowLabel(
                        'up',
                        streams.length,
                        activeLayout,
                        index,
                        moveTargets.up!
                      )}
                    </button>
                  )}
                  {moveTargets.down !== undefined && (
                    <button
                      type="button"
                      onClick={() => swapStream(index, moveTargets.down!)}
                      className={`${baseArrowClass} ${getArrowPositionClass('down', streams.length, activeLayout, index, moveTargets.down!)} `}
                    >
                      {getArrowLabel(
                        'down',
                        streams.length,
                        activeLayout,
                        index,
                        moveTargets.down!
                      )}
                    </button>
                  )}
                  {moveTargets.left !== undefined && (
                    <button
                      type="button"
                      onClick={() => swapStream(index, moveTargets.left!)}
                      className={`${baseArrowClass} ${getArrowPositionClass('left', streams.length, activeLayout, index, moveTargets.left!)}`}
                    >
                      {getArrowLabel(
                        'left',
                        streams.length,
                        activeLayout,
                        index,
                        moveTargets.left!
                      )}
                    </button>
                  )}
                  {moveTargets.right !== undefined && (
                    <button
                      type="button"
                      onClick={() => swapStream(index, moveTargets.right!)}
                      className={`${baseArrowClass} ${getArrowPositionClass('right', streams.length, activeLayout, index, moveTargets.right!)}`}
                    >
                      {getArrowLabel(
                        'right',
                        streams.length,
                        activeLayout,
                        index,
                        moveTargets.right!
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
