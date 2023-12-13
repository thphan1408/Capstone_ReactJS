import { Helmet } from 'react-helmet-async'

import { MovieView } from '../sections/movie-management/view'

// ----------------------------------------------------------------------

export default function MovieManagement() {
  return (
    <>
      <Helmet>
        <title> Movie Management </title>
      </Helmet>
        <MovieView />
    </>
  )
}
