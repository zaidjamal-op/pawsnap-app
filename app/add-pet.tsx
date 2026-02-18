import AddPetScreen, { PetFormData } from '@/components/onboarding/AddPetScreen';
import { usePets } from '@/context/PetContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

export default function AddPetPage() {
  const router = useRouter();
  const { returnTo } = useLocalSearchParams<{ returnTo: string }>();
  const { addPet } = usePets();

  const handleSave = (data: PetFormData) => {
    addPet({
      name: data.name,
      species: data.species === 'dog' ? 'Dog' : 'Cat',
      breed: data.breed,
      age: data.age,
      environment: data.lifestyle === 'indoor' ? 'Indoor' : data.lifestyle === 'outdoor' ? 'Outdoor' : 'Both',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHnuuatuRMi9VNzS8wYJjMROQvj-hcsDzwr-d1x0F0MEZ2zll9CJ0Bj6rVgI615ARPzcO2z1zua3CqG7p7gaWyXJ4TNoc76YkMr1uEYmLwJLnZKgtiVZ-JNBcB8XYFJvG0mNRnmA8Il0NGny8Kz6DBVc4cklsMPZGNtjvTZKu1KMZ3GKbpXaR09H1i0wZwglV4RQ7wUEtAc6txFMN6i63zBQl3jj8dvxB-pNh0V94kxqV0c9L2iPTUYfSWieL3jMeujOte9R9cTvih', // Mock avatar for now
      fleaPrevention: false,
      hypoDiet: false,
      itchAreas: data.itchAreas,
    });

    if (returnTo) {
      router.dismissTo(returnTo as any);
    } else {
      router.replace('/baseline');
    }
  };

  return (
    <AddPetScreen
      onSave={handleSave}
      onCancel={() => router.back()}
    />
  );
}
