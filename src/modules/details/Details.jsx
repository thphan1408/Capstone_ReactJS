import React from 'react'
import MovieProfile from './MovieProfile'
import ShowTimes from './ShowTimes'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

const Details = () => {
  const { movieID } = useParams()
  return (
    <Box>
      <MovieProfile movieID={movieID} />
      <ShowTimes movieID={movieID} />
    </Box>
  )
}

export default Details
