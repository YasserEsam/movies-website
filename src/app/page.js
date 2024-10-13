import Hero from '@/components/Hero'
import MediaSection from '@/components/MediaSection'


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
];

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
];

export default function Home() {
  return (
    <>
      
      <Hero/>
      <MediaSection title="New Movie Arrivals" mediaItems={movies} />
      <MediaSection title="Famous Actors" mediaItems={actors} />
    </>
  )
}
