import React, { useEffect } from 'react'
import ListChair from './List-Chair/ListChair'
import DetailTicket from './Detail-Ticket/DetailTicket'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getChair } from '../../apis/ticketAPI'
import { useDispatch } from 'react-redux'
import { MovieBookingActions } from '../../store/slice'
import { Container, Stack } from '@mui/material'
const TicketMovie = () => {
  const { showtimesID } = useParams()

  const { data: ticketMovie, isLoading: isLoadingShowtimes } = useQuery({
    queryKey: ['get-chair-showtimes', showtimesID],
    queryFn: () => getChair(showtimesID),
    enabled: !!showtimesID,
  })
  console.log('ticketMovie: ', ticketMovie)

  const dispatch = useDispatch()

  dispatch(MovieBookingActions.resetChairBooking())
  return (
    <Container maxWidth="lg">
      <Stack direction={'row'} >
        <ListChair chair={ticketMovie?.danhSachGhe} />
        <DetailTicket detailMovie={ticketMovie?.thongTinPhim} />
      </Stack>
    </Container>
  )
}

export default TicketMovie
