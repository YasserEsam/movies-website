import Hero from '@/components/Hero'
import MediaSection from '@/components/MediaSection'

import { getDictionary } from './dictionaries'
import CustomButton from '@/components/CustomButton'

const movies = [
  {
    title: 'Trendy Jacket',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731972.png',
    genre: 'Action',
    additionalInfo: '2010',
  },
  {
    title: 'Black Blazer',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731993.png',
    genre: 'Drama',
    additionalInfo: '2015',
  },
  {
    title: 'Leonardo DiCaprio',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731972.png',
    genre: 'Actor',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Meryl Streep',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731993.png',
    genre: 'Actress',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Leonardo DiCaprio',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731972.png',
    genre: 'Actor',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Meryl Streep',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731993.png',
    genre: 'Actress',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Leonardo DiCaprio',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731972.png',
    genre: 'Actor',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Meryl Streep',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731993.png',
    genre: 'Actress',
    additionalInfo: 'Award Winner',
  },
]

const actors = [
  {
    title: 'Leonardo DiCaprio',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731972.png',
    genre: 'Actor',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Meryl Streep',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731993.png',
    genre: 'Actress',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Leonardo DiCaprio',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731972.png',
    genre: 'Actor',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Meryl Streep',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731993.png',
    genre: 'Actress',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Leonardo DiCaprio',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731972.png',
    genre: 'Actor',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Meryl Streep',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731993.png',
    genre: 'Actress',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Leonardo DiCaprio',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731972.png',
    genre: 'Actor',
    additionalInfo: 'Award Winner',
  },
  {
    title: 'Meryl Streep',
    imageUrl: 'https://pagedone.io/asset/uploads/1700731993.png',
    genre: 'Actress',
    additionalInfo: 'Award Winner',
  },
]

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang)

  return (
    <>
      <Hero lang={lang} />
      <MediaSection title="New Movie Arrivals" mediaItems={movies} />
      <MediaSection title="Famous Actors" mediaItems={actors} />
    </>
  )
}
