'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function TileWoodVinylPage() {
  useEffect(() => {
    window.location.replace('/room/wood-vinyl');
  }, []);

  return null;
}
