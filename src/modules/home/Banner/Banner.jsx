import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getBannersAPI } from '../../../apis/movieAPI'
import Carousel from 'react-material-ui-carousel'
import { Box, Skeleton } from '@mui/material'
const Banner = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['banner'],
    queryFn: getBannersAPI,
  })

  // console.log('Data', data)
  // console.log('isLoading', isLoading)
  // console.log('isError', isError)

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{ height: 'auto' }}
        animation="wave"
      ></Skeleton>
    )
  }

  return (
    <Carousel>
      {data.map((item) => {
        return (
          <Box key={item.maBanner}>
            <img
              src={item.hinhAnh}
              alt={item.maPhim}
              style={{
                height: 'auto',
                minWidth: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        )
      })}
    </Carousel>
  )
}

export default Banner
