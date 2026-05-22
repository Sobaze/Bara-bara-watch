export function Shortcuts() {
  return (
    <div className="absolute right-1 bottom-13 w-80 rounded-2xl border border-white/10 bg-zinc-900/95 p-3 text-zinc-100 shadow-lg backdrop-blur">
      <p className="mb-3 text-sm font-semibold pb-2">Shortcuts</p>

      <ul className="space-y-2 text-sm">
        <li className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-300">Toggle mute stream 1</span>
          <kbd className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs text-zinc-100">
            1
          </kbd>
        </li>

        <li className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-300">Toggle mute stream 2</span>
          <kbd className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs text-zinc-100">
            2
          </kbd>
        </li>

        <li className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-300">Toggle mute stream 3</span>
          <kbd className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs text-zinc-100">
            3
          </kbd>
        </li>

        <li className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-300">Toggle mute stream 4</span>
          <kbd className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs text-zinc-100">
            4
          </kbd>
        </li>

        <li className="flex items-center justify-between gap-4 border-t border-white/10 pt-2">
          <span className="text-xs text-zinc-300">Play all streams</span>
          <kbd className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs text-zinc-100">
            P
          </kbd>
        </li>

        <li className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-300">Pause all streams</span>
          <kbd className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs text-zinc-100">
            S
          </kbd>
        </li>
      </ul>

      <p className="mt-3 border-t border-white/10 pt-3 text-xs text-zinc-400">
        Shortcuts work when focus is outside the YouTube player.
      </p>
    </div>
  )
}
