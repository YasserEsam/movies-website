import React from 'react'
import MediaSection from './MediaSection'

const AllActors = ({ mediaItems, lang }) => {
  return (
    <MediaSection
      title={lang === 'ar' ? 'جميع الممثلين' : 'All Actors'}
      mediaItems={mediaItems}
      lang={lang}
      isTaged={false}
      type="actors"
    />
  )
}

export default AllActors
