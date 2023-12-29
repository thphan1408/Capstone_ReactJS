import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import { getListMovieAPI } from '../../../apis/movieAPI'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material'

const Showing = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['list-movie'],
    queryFn: getListMovieAPI,
  })

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    autoplay: true,
    centerPadding: '60px',
    slidesToShow: isSmallScreen ? 1 : isTabletScreen ? 2 : 3,
    speed: 500,
    autoplaySpeed: 2000,
  }

  return (
    <Container maxWidth="lg">
      <Slider {...settings}>
        {data?.map((item) => (
          <Grid item key={item.maPhim} sx={{ p: isTabletScreen ? 1 : 1 }}>
            <Card sx={{ width: isTabletScreen ? '100%' : '100%' }}>
              <CardMedia
                component="img"
                height={isSmallScreen ? 'auto' : isTabletScreen ? 200 : 314}
                image={item.hinhAnh}
                alt={item.tenPhim}
                style={{
                  objectFit: 'cover',
                  display: 'block',
                  height: isTabletScreen ? '300px' : '550px',
                }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="truncate"
                >
                  {item.tenPhim}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="truncate truncate--2"
                >
                  {item.moTa}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`movie/${item.maPhim}`)}
                >
                  Xem chi tiết
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Slider>
    </Container>
  )
}

export default Showing
