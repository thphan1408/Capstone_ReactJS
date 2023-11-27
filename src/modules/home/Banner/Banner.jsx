import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getBannersAPI } from '../../../apis/movieAPI'
import Slider from 'react-slick'
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
    dots: true,
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
        sx={{ height: 500 }}
        animation="wave"
      ></Skeleton>
    )
  }

  return (
    <Box>
      <Slider {...settings}>
        {data.map((item) => {
          return (
            <Box key={item.maBanner} sx={{ height: 500 }}>
              <img
                src={item.hinhAnh}
                alt={item.maPhim}
                width="100%"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          )
        })}
      </Slider>
    </Box>
  )
}

export default Banner
