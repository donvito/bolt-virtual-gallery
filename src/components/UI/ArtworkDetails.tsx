import { useGalleryStore } from '../../store/galleryStore';

export function ArtworkDetails() {
  const selectedArtwork = useGalleryStore((state) => state.selectedArtwork);

  if (!selectedArtwork) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/20 backdrop-blur-lg p-6 rounded-lg text-white max-w-md">
      <h2 className="text-2xl font-bold mb-2">{selectedArtwork.title}</h2>
      <div className="space-y-4">
        <div>
          <p className="text-lg font-semibold text-white/90">
            by {selectedArtwork.artist}
          </p>
          <p className="text-sm text-white/70">{selectedArtwork.year}</p>
        </div>
        
        <p className="text-white/80">{selectedArtwork.description}</p>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-2xl font-bold text-white">
            ${selectedArtwork.price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}