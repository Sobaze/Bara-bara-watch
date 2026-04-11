
import { StreamSlotGrid } from "./StreamSlotGrid";
import type { StreamInfo } from "../types/stream"

type WatchroomProps = {
    streams: StreamInfo[],
    onRemoveStream: (streamId: number) => void
}

export function Watchroom({ streams, onRemoveStream }: WatchroomProps) {
  
    function fullScreenStream() {
        document.documentElement.requestFullscreen()
    }
  return (
    <div className="flex flex-col h-230">
      <StreamSlotGrid streams={streams} onRemoveStream={onRemoveStream} />
      <button onClick={fullScreenStream} className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-md">
              Full Screen
          </button>
    </div>
  );
}