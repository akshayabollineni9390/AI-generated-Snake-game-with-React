import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

const TRACKS = [
  { id: 1, title: "Algorithm Blues", subtitle: "AI Neural Wave", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Quantum Drift", subtitle: "Synthetic Echo", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "Binary Sunset", subtitle: "Silicon Dreams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleEnded = () => {
    skipForward();
  };

  return (
    <>
      <aside className="col-start-1 row-start-1 row-span-2 bg-[#0f0f0f] border-r border-[#222222] p-6 flex flex-col gap-8 z-20">
        <div className="text-[14px] font-[800] tracking-[4px] text-[#00f3ff] uppercase">SynthSnake</div>
        <div className="flex flex-col">
          <p className="text-[11px] text-[#888888] uppercase mb-4 tracking-[1px]">Neural Playlist</p>
          {TRACKS.map((track, index) => (
            <div 
              key={track.id}
              onClick={() => { setCurrentTrackIndex(index); setIsPlaying(true); }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${currentTrackIndex === index ? 'bg-[#00f3ff]/10 border border-[#00f3ff]/20' : 'hover:bg-[#222222]/50 border border-transparent'}`}
            >
              <div className="w-12 h-12 rounded bg-gradient-to-tr from-[#1a1a1a] to-[#333333] flex items-center justify-center shrink-0">
                <Music className="w-6 h-6 text-[#888888]" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-[14px] mb-0.5 text-[#ffffff] truncate">{track.title}</h4>
                <p className="text-[12px] text-[#888888] truncate">{track.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <footer className="col-start-2 row-start-2 bg-[#0f0f0f] border-t border-[#222222] flex items-center justify-between px-10 z-20">
        <audio 
          ref={audioRef} 
          src={currentTrack.url} 
          onEnded={handleEnded} 
          loop={false}
        />
        
        <div className="w-[200px]">
          <p className="text-[13px] font-[600] text-[#ffffff] truncate">{currentTrack.title}</p>
          <p className="text-[11px] text-[#888888] truncate">{currentTrack.subtitle}</p>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={skipBackward} className="bg-transparent border-none text-[#ffffff] cursor-pointer flex items-center justify-center hover:text-[#00f3ff] transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-[#ffffff] text-[#050505] cursor-pointer flex items-center justify-center hover:bg-[#00f3ff] transition-colors">
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          <button onClick={skipForward} className="bg-transparent border-none text-[#ffffff] cursor-pointer flex items-center justify-center hover:text-[#00f3ff] transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 mx-[60px] flex items-center gap-4">
          <div className="text-[10px] text-[#888888] font-mono">00:00</div>
          <div className="h-1 bg-[#222222] rounded-full flex-1 relative overflow-hidden">
             {isPlaying ? (
               <div className="absolute inset-0 flex items-center gap-[2px] px-1">
                 {[...Array(60)].map((_, i) => (
                   <div 
                     key={i} 
                     className="w-1 bg-[#00f3ff] rounded-full animate-pulse shadow-[0_0_10px_#00f3ff]"
                     style={{ 
                       height: `${Math.max(20, Math.random() * 100)}%`,
                       animationDelay: `${i * 0.05}s`,
                       animationDuration: '0.5s'
                     }}
                   />
                 ))}
               </div>
             ) : (
               <div className="h-full w-[35%] bg-[#00f3ff] rounded-full shadow-[0_0_10px_#00f3ff]"></div>
             )}
          </div>
          <div className="text-[10px] text-[#888888] font-mono">--:--</div>
        </div>

        <div className="w-[100px] flex items-center gap-2.5">
          <Volume2 className="w-4 h-4 text-[#888888]" />
          <div className="h-1 bg-[#222222] rounded-full flex-1">
            <div className="h-full w-[70%] bg-[#00f3ff] rounded-full shadow-[0_0_10px_#00f3ff]"></div>
          </div>
        </div>
      </footer>
    </>
  );
}
