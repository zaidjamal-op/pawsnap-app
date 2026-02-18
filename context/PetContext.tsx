import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Pet {
  id: string;
  name: string;
  species: 'Dog' | 'Cat';
  breed: string;
  age: string;
  environment: 'Indoor' | 'Outdoor' | 'Both';
  avatar: string;
  active: boolean;
  lastCheckIn?: string;
  fleaPrevention?: boolean;
  hypoDiet?: boolean;
  itchAreas?: string[];
}

export interface CheckIn {
  id: string;
  petId: string;
  date: string; // ISO string
  itchLevel: number;
  selectedParts: string[];
  skinSigns: string[];
  exposures: string[];
  imageUri?: string;
  videoUri?: string;
  audioUri?: string; // Voice note
  notes?: string;
}

export interface Flare {
  id: string;
  petId: string;
  date: string; // ISO string
  itchLevel: number;
  triggers: string[];
  notes?: string;
  imageUri?: string;
}

interface PetContextType {
  pets: Pet[];
  activePetId: string | null;
  checkIns: CheckIn[];
  flares: Flare[];
  isPremium: boolean;
  currentStreak: number;
  customBodyParts: string[];
  addCustomBodyPart: (part: string) => void;
  removeCustomBodyPart: (part: string) => void;
  customSkinSigns: { label: string; emoji?: string }[];
  addCustomSkinSign: (label: string, emoji?: string) => void;
  removeCustomSkinSign: (label: string) => void;
  customExposures: { label: string; emoji?: string }[];
  addCustomExposure: (label: string, emoji?: string) => void;
  removeCustomExposure: (label: string) => void;
  addPet: (pet: Omit<Pet, 'id' | 'active'>) => void;
  updatePet: (id: string, data: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  setActivePet: (id: string) => void;
  getPet: (id: string) => Pet | undefined;
  addCheckIn: (checkIn: Omit<CheckIn, 'id'>) => void;
  updateCheckIn: (id: string, data: Partial<CheckIn>) => void;
  deleteCheckIn: (id: string) => void;
  addFlare: (flare: Omit<Flare, 'id'>) => void;
  updateFlare: (id: string, data: Partial<Flare>) => void;
  deleteFlare: (id: string) => void;
  setPremium: (status: boolean) => void;
  activeProtocol: { name: string; day: number; totalDays: number } | null;
  startProtocol: (name: string) => void;
  cancelProtocol: () => void;
  media: Media[];
  addMedia: (media: Omit<Media, 'id'>) => void;
  deleteMedia: (id: string) => void;
}

export interface Media {
  id: string;
  petId: string;
  date: string; // ISO string
  type: 'photo' | 'video';
  uri: string;
  area?: string; // e.g. Paws, Ears, Belly
  notes?: string;
  checkInId?: string;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

// Mock initial data
const INITIAL_PETS: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '4 yrs',
    environment: 'Indoor',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHnuuatuRMi9VNzS8wYJjMROQvj-hcsDzwr-d1x0F0MEZ2zll9CJ0Bj6rVgI615ARPzcO2z1zua3CqG7p7gaWyXJ4TNoc76YkMr1uEYmLwJLnZKgtiVZ-JNBcB8XYFJvG0mNRnmA8Il0NGny8Kz6DBVc4cklsMPZGNtjvTZKu1KMZ3GKbpXaR09H1i0wZwglV4RQ7wUEtAc6txFMN6i63zBQl3jj8dvxB-pNh0V94kxqV0c9L2iPTUYfSWieL3jMeujOte9R9cTvih',
    active: true,
    lastCheckIn: '4h ago',
    fleaPrevention: true,
    hypoDiet: false,
  },
   {
    id: '2',
    name: 'Charlie',
    species: 'Cat',
    breed: 'Siamese',
    age: '2 yrs',
    environment: 'Indoor',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw7BaKYie_BZTlv3PJ0EafkOMwzh4r9WUSFNn6lvS95y-WIcEncZgZNSVn4Vl2mVc7IieypeA7D0LLxUpXojcYFueevgCqiOK45m06BV-onPLG721mFpszIbu15JY-vwTPajdr-M2DcbX1PLNyBMJ9xlhzgRJO6SGn3hpa-K9-wy7pAmYrduPnwTpaBeYpXdy5wmkJ-Zj_1zOx4CxdgIW0LmTbeXSoN4qrYU0avRhUzgzgYHKqN_OiuxiPcTs8IxzvfJH9YOXZs8lb',
    active: false,
    lastCheckIn: '1d ago',
    fleaPrevention: false,
    hypoDiet: true,
  },
];

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [activePetId, setActivePetId] = useState<string | null>('1');
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [flares, setFlares] = useState<Flare[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [activeProtocol, setActiveProtocol] = useState<{ name: string; day: number; totalDays: number } | null>(null);
  const [customBodyParts, setCustomBodyParts] = useState<string[]>([]);
  const [customSkinSigns, setCustomSkinSigns] = useState<{ label: string; emoji?: string }[]>([]);
  const [customExposures, setCustomExposures] = useState<{ label: string; emoji?: string }[]>([]);

  // Mock initial media
  const INITIAL_MEDIA: Media[] = [
    { id: 'm1', petId: '1', date: new Date().toISOString(), type: 'photo', uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300', area: 'Paws', notes: 'Redness observed' },
    { id: 'm2', petId: '1', date: new Date(Date.now() - 86400000 * 2).toISOString(), type: 'photo', uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300', area: 'Ears' },
    { id: 'm3', petId: '1', date: new Date(Date.now() - 86400000 * 5).toISOString(), type: 'video', uri: 'https://www.w3schools.com/html/mov_bbb.mp4', area: 'Belly', notes: 'Scratching behavior' },
  ];
  const [media, setMedia] = useState<Media[]>(INITIAL_MEDIA);

  // Derived state: Current Streak
  const currentStreak = React.useMemo(() => {
    if (!activePetId || checkIns.length === 0) return 0;

    const petCheckIns = checkIns
      .filter(c => c.petId === activePetId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (petCheckIns.length === 0) return 0;

    // Get unique dates (YYYY-MM-DD)
    const uniqueDates = Array.from(new Set(petCheckIns.map(c => c.date.split('T')[0])));
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if the most recent check-in is today or yesterday
    if (uniqueDates[0] === today) {
        streak = 1;
        // Check backwards
        for (let i = 1; i < uniqueDates.length; i++) {
            const expectedDate = new Date(Date.now() - (i * 86400000)).toISOString().split('T')[0];
            if (uniqueDates[i] === expectedDate) {
                streak++;
            } else {
                break;
            }
        }
    } else if (uniqueDates[0] === yesterday) {
        streak = 1;
        // Check backwards from yesterday
        for (let i = 1; i < uniqueDates.length; i++) {
             const expectedDate = new Date(Date.now() - ((i + 1) * 86400000)).toISOString().split('T')[0];
             if (uniqueDates[i] === expectedDate) {
                 streak++;
             } else {
                 break;
             }
        }
    }

    return streak;
  }, [checkIns, activePetId]);


  const addCustomBodyPart = (part: string) => {
     if (!customBodyParts.includes(part)) {
        setCustomBodyParts(prev => [...prev, part]);
     }
  };

  const removeCustomBodyPart = (part: string) => {
    setCustomBodyParts(prev => prev.filter(p => p !== part));
  };

  const addCustomSkinSign = (label: string, emoji?: string) => {
    if (!customSkinSigns.some(s => s.label === label)) {
      setCustomSkinSigns(prev => [...prev, { label, emoji }]);
    }
  };

  const removeCustomSkinSign = (label: string) => {
    setCustomSkinSigns(prev => prev.filter(s => s.label !== label));
  };

  const addCustomExposure = (label: string, emoji?: string) => {
    if (!customExposures.some(e => e.label === label)) {
       setCustomExposures(prev => [...prev, { label, emoji }]);
    }
  };

  const removeCustomExposure = (label: string) => {
    setCustomExposures(prev => prev.filter(e => e.label !== label));
  };

  const startProtocol = (name: string) => {
    setActiveProtocol({ name, day: 1, totalDays: 14 });
  };

  const cancelProtocol = () => {
    setActiveProtocol(null);
  };

  const addPet = (petData: Omit<Pet, 'id' | 'active'>) => {
    const newPet: Pet = {
      ...petData,
      id: Date.now().toString(), // Simple ID generation
      active: pets.length === 0, // Auto-activate if first pet
    };
    
    setPets(prev => [...prev, newPet]);
    if (pets.length === 0) {
      setActivePetId(newPet.id);
    }
  };

  const updatePet = (id: string, data: Partial<Pet>) => {
    setPets(prev => prev.map(pet => pet.id === id ? { ...pet, ...data } : pet));
  };

  const deletePet = (id: string) => {
    setPets(prev => {
      const filtered = prev.filter(pet => pet.id !== id);
      // If we deleted the active pet, switch to another one if available
      if (activePetId === id && filtered.length > 0) {
        setActivePetId(filtered[0].id);
      } else if (filtered.length === 0) {
        setActivePetId(null);
      }
      return filtered;
    });
  };

  const setActivePet = (id: string) => {
    setActivePetId(id);
    setPets(prev => prev.map(pet => ({
      ...pet,
      active: pet.id === id
    })));
  };
  
  const getPet = (id: string) => {
    return pets.find(p => p.id === id);
  };

  const addCheckIn = (checkIn: Omit<CheckIn, 'id'>) => {
    const newCheckIn = { ...checkIn, id: Date.now().toString() };
    setCheckIns(prev => [newCheckIn, ...prev]);
  };

  const updateCheckIn = (id: string, data: Partial<CheckIn>) => {
    setCheckIns(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteCheckIn = (id: string) => {
    setCheckIns(prev => prev.filter(c => c.id !== id));
  };

  const addFlare = (flare: Omit<Flare, 'id'>) => {
    const newFlare = { ...flare, id: Date.now().toString() };
    setFlares(prev => [newFlare, ...prev]);
  };

  const updateFlare = (id: string, data: Partial<Flare>) => {
    setFlares(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
  };

  const deleteFlare = (id: string) => {
    setFlares(prev => prev.filter(f => f.id !== id));
  };

  const setPremium = (status: boolean) => {
    setIsPremium(status);
  };

  const addMedia = (item: Omit<Media, 'id'>) => {
    const newItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
    setMedia(prev => [newItem, ...prev]);
  };

  const deleteMedia = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id));
  };

  return (
    <PetContext.Provider value={{ 
      pets, activePetId, checkIns, flares, isPremium, currentStreak,
      customBodyParts, addCustomBodyPart, removeCustomBodyPart,
      customSkinSigns, addCustomSkinSign, removeCustomSkinSign,
      customExposures, addCustomExposure, removeCustomExposure,
      addPet, updatePet, deletePet, setActivePet, getPet,
      addCheckIn, updateCheckIn, deleteCheckIn,
      addFlare, updateFlare, deleteFlare,
      setPremium,
      activeProtocol, startProtocol, cancelProtocol,
      media, addMedia, deleteMedia
    }}>
      {children}
    </PetContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
}
