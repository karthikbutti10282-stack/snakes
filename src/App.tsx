import React, { useState } from 'react';
import { MusicPlayer } from './components/MusicPlayer';
import { SnakeGame } from './components/SnakeGame';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mesh BG */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at 20% 20%, rgba(0,243,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,0,255,0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(30,30,60,0.4) 0%, transparent 100%)' 
        }}
      ></div>

      <div className="relative z-10 w-full max-w-[960px] h-[700px] grid grid-cols-1 lg:grid-cols-[280px_1fr] grid-rows-[auto_1fr] lg:grid-rows-[80px_1fr] gap-[20px]">
        {/* Header */}
        <header className="lg:col-span-2 flex items-center justify-between px-[30px] py-[15px] lg:py-0 bg-white/[0.03] backdrop-blur-[15px] border border-white/10 rounded-[24px]">
          <h1 className="text-[24px] font-black tracking-[4px] uppercase bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] bg-clip-text text-transparent m-0">
            SynthSnake
          </h1>
          <div className="flex gap-[40px] items-center">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-[2px] opacity-60 mb-[4px]">Score</div>
              <div className="text-[24px] font-bold font-mono text-[#00f3ff] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] leading-none">
                {score.toString().padStart(5, '0')}
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar / Music Player */}
        <aside className="lg:col-span-1 lg:row-span-1 bg-white/[0.03] backdrop-blur-[15px] border border-white/10 rounded-[24px] p-[24px] flex flex-col gap-[20px] overflow-y-auto">
          <MusicPlayer />
        </aside>

        {/* Game Board */}
        <main className="lg:col-span-1 lg:row-span-1 flex justify-center items-center bg-black/30 border border-white/5 rounded-[24px] relative overflow-hidden min-h-[450px]">
          <SnakeGame onScoreChange={setScore} />
        </main>
      </div>
    </div>
  );
}
