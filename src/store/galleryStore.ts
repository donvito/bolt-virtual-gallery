import { create } from 'zustand';
import { Artwork } from '../types/gallery';

interface GalleryState {
  artworks: Artwork[];
  selectedArtwork: Artwork | null;
  addArtwork: (artwork: Artwork) => void;
  setSelectedArtwork: (artwork: Artwork | null) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  artworks: [
    {
      id: '1',
      title: 'Neon Dreams',
      imageUrl: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&q=80&w=800',
      price: 2500,
      artist: 'Elena Rodriguez',
      description: 'A vibrant exploration of urban nightlife through neon-inspired abstract forms.',
      year: 2023
    },
    {
      id: '2',
      title: 'Abstract Harmony',
      imageUrl: 'https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?auto=format&fit=crop&q=80&w=800',
      price: 1800,
      artist: 'Marcus Chen',
      description: 'Geometric patterns interweave with organic shapes creating a harmonious balance.',
      year: 2023
    },
    {
      id: '3',
      title: 'Urban Landscape',
      imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=800',
      price: 3200,
      artist: 'Sarah Williams',
      description: 'A contemporary interpretation of city life through abstract architectural forms.',
      year: 2022
    },
    {
      id: '4',
      title: 'Digital Dreams',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
      price: 2800,
      artist: 'David Kim',
      description: 'Digital art meets traditional techniques in this dreamlike composition.',
      year: 2023
    },
    {
      id: '5',
      title: 'Cosmic Patterns',
      imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
      price: 4200,
      artist: 'Luna Nova',
      description: 'Inspired by celestial phenomena and sacred geometry.',
      year: 2023
    },
    {
      id: '6',
      title: 'Color Symphony',
      imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800',
      price: 3500,
      artist: 'Alex Foster',
      description: 'An exploration of color theory through dynamic abstract forms.',
      year: 2023
    },
    {
      id: '7',
      title: 'Geometric Wonder',
      imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800',
      price: 2900,
      artist: 'Maria Torres',
      description: 'Precise geometric patterns create an illusion of depth and movement.',
      year: 2022
    },
    {
      id: '8',
      title: 'Digital Waves',
      imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=800',
      price: 3100,
      artist: 'James Lee',
      description: 'Digital manipulation creates flowing forms reminiscent of ocean waves.',
      year: 2023
    },
  ],
  selectedArtwork: null,
  addArtwork: (artwork) =>
    set((state) => ({
      artworks: [...state.artworks, artwork],
    })),
  setSelectedArtwork: (artwork) =>
    set(() => ({
      selectedArtwork: artwork,
    })),
}));