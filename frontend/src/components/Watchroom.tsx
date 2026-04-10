
import { StreamSlotGrid } from "./StreamSlotGrid";
import type { StreamInfo } from "../types/stream"

type WatchroomProps = {
    streams: StreamInfo[],
    onRemoveStream: (streamId: number) => void
}

export function Watchroom({ streams, onRemoveStream }: WatchroomProps) {
  return (
    <div className="flex flex-col h-150">
      <StreamSlotGrid streams={streams} onRemoveStream={onRemoveStream} />
    </div>
  );
}