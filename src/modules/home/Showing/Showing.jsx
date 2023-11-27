import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
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
} from '@mui/material'

const Showing = () => {
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['list-movie'],
    queryFn: getListMovieAPI,
  })

  // console.log('Data', data)

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {data?.map((item) => {
          return (
            <Grid item xs={3} key={item.maPhim}>
              <Card>
                <CardMedia
                  sx={{ height: 180 }}
                  image={item.hinhAnh}
                  title={item.tenPhim}
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
                    onClick={() => {
                      navigate(`movie/${item.maPhim}`)
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Showing
