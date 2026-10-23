'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function FeaturedIndexPage() {
  useEffect(() => {
    window.location.replace('/featured/best-sellers');
  }, []);

  return null;
}
