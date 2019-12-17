import React from 'react'

import DefaultLayout from 'layouts'
import { Header, HomeBanner, SliceZone } from 'components'
import Error from './_error'

import { Client } from 'utils/prismicHelpers'

const HomePage = ({ doc, menu, displayWarning }) => {
  if (doc) {
    return (
      <DefaultLayout>
        <div className='homepage'>
          {displayWarning
            ? <div class="warning">⚠️ Warning: Please fill in the "title" field.</div>
            : null
          }
          <Header menu={menu} />
          <HomeBanner banner={doc.data.homepage_banner[0]} />
          <SliceZone sliceZone={doc.data.page_content} />
        </div>
      </DefaultLayout>
    )
  }

  // Call the standard error page if the document was not found
  return <Error statusCode="404" />
}


HomePage.getInitialProps = async ({ req }) => {
  try {
    const previewMode = req.headers.cookie.includes("%22preview%22");
    let displayWarning = false;

    // Query both the homepage and navigation menu documents
    const doc = await Client(req).getSingle('homepage', {'fetchLinks': 'artist.name'})
    const menu = await Client(req).getSingle('menu')

    if (doc.data.homepage_banner[0].title[0].text == "" && previewMode)
      displayWarning = true;

    return {
      doc,
      menu,
      displayWarning
    }
  } catch (error) {
    console.error(error)
    return error
  }
}

export default HomePage
