import React, { useEffect } from 'react'
import ListChair from './List-Chair/ListChair'
import DetailTicket from './Detail-Ticket/DetailTicket'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getChair } from '../../apis/ticketAPI'
import { useDispatch } from 'react-redux'
import { MovieBookingActions } from '../../store/slice'
import { Container, Grid, Stack, Box } from '@mui/material'
const TicketMovie = () => {
  const { showtimesID } = useParams()

  const { data: ticketMovie, isLoading: isLoadingShowtimes } = useQuery({
    queryKey: ['get-chair-showtimes', showtimesID],
    queryFn: () => getChair(showtimesID),
    enabled: !!showtimesID,
  })

  const dispatch = useDispatch()

  dispatch(MovieBookingActions.resetChairBooking())
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ margin: '20px 0' }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction={'row'}
            justifyContent="space-around"
            alignItems={'center'}
          >
            <Grid item xs={7}>
              <ListChair chair={ticketMovie?.danhSachGhe} />
            </Grid>
            <Grid item xs={5}>
              <DetailTicket
                detailMovie={ticketMovie?.thongTinPhim}
                showtimesID={showtimesID}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default TicketMovie
