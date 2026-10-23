'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function FlooringWoodVinylPage() {
  useEffect(() => {
    window.location.replace('/room/wood-vinyl');
  }, []);

  return null;
}
