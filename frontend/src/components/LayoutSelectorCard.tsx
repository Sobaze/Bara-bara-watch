import type { LayoutMode } from '../types/stream'
type LayoutSelectorCardProps = {
  label: string
  previewClassName: string
  mainBoxClassName?: string
  layoutMode: LayoutMode
  onClick: () => void
}
export function LayoutSelectorCard({
  label,
  previewClassName,
  layoutMode,
  onClick,
  mainBoxClassName,
}: LayoutSelectorCardProps) {
  return (
    <>
      {layoutMode === '2-stream' && (
        <button
          type="button"
          className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-left transition hover:border-white/20 hover:bg-zinc-700"
          onClick={onClick}
        >
          <div className={previewClassName}>
            <div className="rounded bg-zinc-600" />
            <div className="rounded bg-zinc-600" />
          </div>
          <span className="text-xs text-zinc-300">{label}</span>
        </button>
      )}
      {layoutMode === '3-stream' && (
        <button
          type="button"
          className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-left transition hover:border-white/20 hover:bg-zinc-700"
          onClick={onClick}
        >
          <div className={previewClassName}>
            <div className={mainBoxClassName} />
            <div className="rounded bg-zinc-600" />
            <div className="rounded bg-zinc-600" />
          </div>
          <span className="text-xs text-zinc-300">{label}</span>
        </button>
      )}
    </>
  )
}
