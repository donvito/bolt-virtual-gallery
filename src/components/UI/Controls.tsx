import { Camera, Upload } from 'lucide-react';
import { useGalleryStore } from '../../store/galleryStore';
import { ArtworkDetails } from './ArtworkDetails';

const CONTROLS_HELP = [
  { key: 'W / ↑', action: 'Move Forward' },
  { key: 'S / ↓', action: 'Move Backward' },
  { key: 'A / ←', action: 'Move Left' },
  { key: 'D / →', action: 'Move Right' },
  { key: 'Mouse', action: 'Look Around (Click to Start)' },
  { key: 'ESC', action: 'Release Mouse' },
  { key: 'Scroll', action: 'Zoom In/Out' },
];

export function Controls() {
  const addArtwork = useGalleryStore((state) => state.addArtwork);

  const handleUpload = () => {
    // In a real app, this would open a file picker and upload to a server
    const newArtwork = {
      id: Date.now().toString(),
      title: 'New Artwork',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
    };
    addArtwork(newArtwork);
  };

  return (
    <>
      <div className="fixed top-4 left-4 bg-black/20 backdrop-blur-lg p-4 rounded-lg text-white">
        <h3 className="font-semibold mb-2 text-lg">Gallery Controls</h3>
        <ul className="space-y-1 text-sm">
          {CONTROLS_HELP.map(({ key, action }) => (
            <li key={key} className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded min-w-[60px] text-center">{key}</kbd>
              <span>{action}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-white/70">Click anywhere to enable mouse controls</p>
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-black/20 backdrop-blur-lg p-4 rounded-full">
        <button
          onClick={handleUpload}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          title="Upload Artwork"
        >
          <Upload className="w-6 h-6 text-white" />
        </button>
        <button
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          title="Take Screenshot"
        >
          <Camera className="w-6 h-6 text-white" />
        </button>
      </div>
      <ArtworkDetails />
    </>
  );
}