import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getMovieDetailsAPI } from '../../../apis/movieAPI'

const MovieProfile = ({ movieID }) => {
  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['movie-details', movieID],
    queryFn: () => getMovieDetailsAPI(movieID),
    enabled: !!movieID, // false | true, khi enabled là true thì queryFun mới được kích hoạt. Ngược lại là false thì sẽ không kích hoạt queryFun
  })

  //   useEffect(() => {}, [])

  // console.log('data', data)
  return <div></div>
}

export default MovieProfile
