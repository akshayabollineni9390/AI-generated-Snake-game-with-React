import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="h-screen w-full bg-[#050505] text-[#ffffff] font-sans overflow-hidden grid grid-cols-[300px_1fr] grid-rows-[1fr_100px]">
      <MusicPlayer />
      <main className="col-start-2 row-start-1 bg-[radial-gradient(circle_at_center,#111111_0%,#050505_100%)] flex flex-col items-center justify-center relative">
        <SnakeGame />
      </main>
    </div>
  );
}
