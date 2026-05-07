import type {
  LayoutMode,
  ThreeStreamLayout,
  TwoStreamLayout,
} from '../types/stream'
import { LayoutSelectorCard } from './LayoutSelectorCard'

type StreamLayoutSelectorProps = {
  onSelectLayout2Streams: (layout: TwoStreamLayout) => void
  onSelectLayout3Streams: (layout: ThreeStreamLayout) => void

  layoutMode: LayoutMode
}

export function StreamLayoutSelector({
  onSelectLayout2Streams,
  onSelectLayout3Streams,
  layoutMode,
}: StreamLayoutSelectorProps) {
  return (
    <div>
      {layoutMode === '2-stream' && (
        <div className="w-120 absolute right-1 bottom-13 rounded-2xl border border-white/10 bg-zinc-900/95 p-3 text-zinc-100 shadow-lg backdrop-blur">
          <p className="mb-10 pb-4 text-sm font-semibold">Layout Options</p>
          <div className="grid grid-cols-2 gap-2">
            <LayoutSelectorCard
              label="Side by side"
              previewClassName="mb-2 grid h-14 grid-cols-2 gap-1"
              layoutMode={layoutMode}
              onClick={() => onSelectLayout2Streams('side-by-side')}
            />
            <LayoutSelectorCard
              label="Stacked"
              previewClassName="mb-2 grid h-14 grid-rows-2 gap-1"
              layoutMode={layoutMode}
              onClick={() => onSelectLayout2Streams('stacked')}
            />
          </div>
        </div>
      )}
      {layoutMode === '3-stream' && (
        <div className="w-120 absolute right-1 bottom-13 rounded-2xl border border-white/10 bg-zinc-900/95 p-3 text-zinc-100 shadow-lg backdrop-blur">
          <p className="mb-3 text-sm font-semibold">Layout Options</p>
          <div className="grid grid-cols-2 gap-2">
            <LayoutSelectorCard
              label="Main on Left"
              previewClassName="mb-2 grid h-20 grid-rows-2 grid-cols-2 gap-1"
              mainPos="rounded bg-zinc-600 row-span-2"
              layoutMode={layoutMode}
              onClick={() => onSelectLayout3Streams('main-on-left')}
            />

            <LayoutSelectorCard
              label="Main on Top"
              previewClassName="mb-2 grid h-20 grid-cols-2 grid-rows-2 gap-1"
              mainPos="rounded bg-zinc-600 col-span-2"
              layoutMode={layoutMode}
              onClick={() => onSelectLayout3Streams('main-on-top')}
            />
          </div>
        </div>
      )}
    </div>
  )
}
