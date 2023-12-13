import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ListMovieView } from '../sections/list-movie/view'

const ListMovie = () => {
  return (
    <>
      <Helmet>List movie view</Helmet>
      <ListMovieView />
    </>
  )
}

export default ListMovie
