import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://themaven.in';
  return [
    {
      url: `${baseUrl}/homepage`,
      lastModified: new Date('2026-03-23'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}