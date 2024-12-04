export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  artist: string;
  description: string;
  year: number;
}

export interface ArtworkProps {
  position: [number, number, number];
  rotation: [number, number, number];
  artwork: Artwork;
  onInteract?: () => void;
}