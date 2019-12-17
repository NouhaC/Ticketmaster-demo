import React from 'react'
import { RichText } from 'prismic-reactjs'
import { lineupStyles } from 'styles'
import { linkResolver } from 'prismic-configuration'


const LineUp = ({ slice }) => (
  <section className="content-section line-up">
    <RichText render={slice.primary.title} linkResolver={linkResolver} />
    <div class="buttons-container">
      {slice.primary.atoz_filter
        ? <a class="button" href="#">A-Z</a>
        : null
      } - 
      {slice.primary.day_filter
        ? <DaysButton day="Friday" />
        : null
      } - 
      {slice.primary.day_filter
        ? <DaysButton day="Saturday" />
        : null
      }
    </div>
    <div class="artists">
      {slice.items.map((artist, index) => (
        <ArtistName name={artist.artist.data.name} />
      ))}
    </div>
    <div>
      <a href="#" class="button">Show more</a>
    </div>
    <style jsx global>{lineupStyles}</style>
  </section>
)

const DaysButton = ({ day }) => (
  <a class="button" href="#">{day}</a>
)

const ArtistName = ({ name }) => (
<span>{name} / </span>
)

export default LineUp
