import React from 'react';
import { GalleryScene } from './components/Gallery/GalleryScene';
import { Controls } from './components/UI/Controls';

function App() {
  return (
    <div className="w-full h-screen bg-black">
      <GalleryScene />
      <Controls />
    </div>
  );
}

export default App;
