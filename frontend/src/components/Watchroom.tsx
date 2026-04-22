import { useEffect, useRef, useState } from "react";
import { StreamSlotGrid } from "./StreamSlotGrid";
import type { StreamInfo } from "../types/stream"
import { StreamSettings } from "./StreamSettings";
import { StreamLayoutSelector } from "./StreamLayoutSelector";

type WatchroomProps = {
    streams: StreamInfo[],
    onRemoveStream: (streamId: number) => void
}

export function Watchroom({ streams, onRemoveStream }: WatchroomProps) {
    const fullScreenRef = useRef<HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLayoutSelectorOpen, setIsLayoutSelectorOpen] = useState(false);
    const [isStreamSettingsOpen, setIsStreamSettingsOpen] = useState(false);
    const [twoStreamLayout, setTwoStreamLayout] = useState<'side-by-side' | 'stacked'>('side-by-side');
    const [threeStreamLayout, setThreeStreamLayout] = useState<'main-on-top' | 'main-on-left'>('main-on-left');

    const canChangeLayout = streams.length === 2 || streams.length === 3;
    const activeLayout = streams.length === 2 ? twoStreamLayout : streams.length === 3 ? threeStreamLayout : null;  

    useEffect(() => { 
      function handleFullScreenChange() {
        setIsFullScreen(document.fullscreenElement === fullScreenRef.current);
      }
      document.addEventListener("fullscreenchange", handleFullScreenChange);
      return () => {
        document.removeEventListener("fullscreenchange", handleFullScreenChange);
      };
    },[])

    function fullScreenStream() {
        fullScreenRef.current?.requestFullscreen();
    }

    function handleExitFullScreen() {
        document.exitFullscreen();
    }

    function handleToggleLayoutSelector() {
      setIsLayoutSelectorOpen((current) => {
        const next = !current;
        if (next) {
          setIsStreamSettingsOpen(false);
        }
        return next;
      });
    }

    function handleToggleStreamSettings() {
      setIsStreamSettingsOpen((current) => {
        const next = !current;
        if (next) {
          setIsLayoutSelectorOpen(false);
        }
        return next;
      });
    }

    function handleSelectLayout2Streams(layout: 'side-by-side' | 'stacked') {
      setTwoStreamLayout(layout);
    }

    function handleSelectLayout3Streams(layout: 'main-on-top' | 'main-on-left') {
      setThreeStreamLayout(layout);
    }
   
  return (
    <div
      ref={fullScreenRef}
      className="relative flex h-230 flex-col overflow-hidden rounded-2xl bg-zinc-950"
    >
      <div className="h-full">
        {
          <StreamSlotGrid streams={streams}  layout={activeLayout} />
        }
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex items-end gap-3">
        {isLayoutSelectorOpen && canChangeLayout && <StreamLayoutSelector streams={streams} onSelectLayout2Streams={handleSelectLayout2Streams} onSelectLayout3Streams={handleSelectLayout3Streams} />}
        {isStreamSettingsOpen && (
          <StreamSettings streams={streams} onRemoveStream={onRemoveStream} />
        )}

        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/85 p-2 shadow-lg backdrop-blur">
          {canChangeLayout && (
            <button
              type="button"
              onClick={handleToggleLayoutSelector}
              className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
            >
              Layout
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleStreamSettings}
            className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
          >
            Streams
          </button>

          <button
            type="button"
            onClick={isFullScreen ? handleExitFullScreen : fullScreenStream}
            className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            {isFullScreen ? "Exit Full Screen" : "Full Screen"}
          </button>
        </div>
      </div>
    </div>
  );
}
