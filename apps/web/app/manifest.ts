import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Toca',
    short_name: 'Toca',
    description: 'Talk freely. Connect instantly',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/toca-app-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/toca-app-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}