import React from 'react'
import MediaSection from './MediaSection'

const AllTv = ({ mediaItems, lang }) => {
  return (
    <MediaSection
      title={lang === 'ar' ? 'جميع العروض التلفزيونية' : 'All TV Shows'}
      mediaItems={mediaItems}
      lang={lang}
      isTaged={false}
    />
  )
}

export default AllTv
