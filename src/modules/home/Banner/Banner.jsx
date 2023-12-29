import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getBannersAPI } from '../../../apis/movieAPI'
import Carousel from 'react-material-ui-carousel'
import { Box, Skeleton, useMediaQuery } from '@mui/material'
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
  const isSmallScreen = useMediaQuery('(max-width:600px)')

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
        sx={{ height: isSmallScreen ? '200px' : '400px' }}
        animation="wave"
      ></Skeleton>
    )
  }

  return (
    <Carousel>
      {data.map((item) => {
        return (
          <Box
            key={item.maBanner}
            style={{
              minHeight: isSmallScreen ? '200px' : '400px',
              objectFit: 'cover',
            }}
          >
            <img
              src={item.hinhAnh}
              style={{ width: '100%' }}
              alt={item.maPhim}
            />
          </Box>
        )
      })}
    </Carousel>
  )
}

export default Banner
