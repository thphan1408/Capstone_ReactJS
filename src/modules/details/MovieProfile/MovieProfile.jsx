import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getMovieDetailsAPI } from '../../../apis/movieAPI'
import { Box, Container, Grid, Stack } from '@mui/material'

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

  console.log('🚀  data:', data)

  //   useEffect(() => {}, [])

  return (
    <Container maxWidth="lg">
      <Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  )
}

export default MovieProfile
