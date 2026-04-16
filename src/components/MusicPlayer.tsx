import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';

const TRACKS = [
  { id: 1, title: "Neon Nights (AI Gen)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Cyber City (AI Gen)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "Digital Dreams (AI Gen)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  
  const handleSkip = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleEnded = () => {
    handleSkip();
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-[14px] font-semibold uppercase tracking-[1px] mb-[10px] opacity-80">Queue</div>
      
      <div className="flex flex-col gap-[12px] mb-6">
        {TRACKS.map((track, index) => (
          <div 
            key={track.id}
            className={`p-[12px] rounded-[12px] flex items-center gap-[12px] border transition-all duration-300 ${
              index === currentTrackIndex 
                ? 'bg-[#00f3ff]/10 border-[#00f3ff]/30' 
                : 'bg-white/5 border-transparent'
            }`}
          >
            <div className="w-[40px] h-[40px] rounded-[6px] bg-gradient-to-br from-[#00f3ff] to-[#0044ff] flex items-center justify-center text-[10px]">♪</div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold mb-[2px]">{track.title}</div>
              <div className="text-[11px] opacity-50">AI Echo</div>
            </div>
          </div>
        ))}
      </div>

      {/* Fake visualizer */}
      <div className="w-full h-24 mb-6 rounded-[12px] bg-black/30 border border-white/5 flex items-center justify-center relative overflow-hidden">
        <div className="flex items-end gap-1 h-12">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2 bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] rounded-t-[2px] transition-all duration-150 ${isPlaying ? 'animate-pulse' : 'h-1'}`}
              style={{ 
                height: isPlaying ? `${Math.max(20, Math.random() * 100)}%` : '4px',
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <audio 
        ref={audioRef} 
        src={TRACKS[currentTrackIndex].url} 
        onEnded={handleEnded}
        loop={false}
      />

      <div className="mt-auto flex flex-col gap-6">
        <div className="flex items-center justify-center gap-[25px]">
          <button onClick={handlePrev} className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <SkipBack size={20} />
          </button>
          <button 
            onClick={handlePlayPause} 
            className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-1" />}
          </button>
          <button onClick={handleSkip} className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="flex items-center gap-[10px]">
          <button onClick={() => setIsMuted(!isMuted)} className="opacity-80 hover:opacity-100 transition-opacity">
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <div className="flex-1 h-[4px] bg-white/10 rounded-[2px] relative flex items-center">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="h-full bg-white/50 rounded-[2px] pointer-events-none" 
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
