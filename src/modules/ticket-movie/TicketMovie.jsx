import React from 'react'
import ListChair from './List-Chair/ListChair'
import DetailTicket from './Detail-Ticket/DetailTicket'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
const TicketMovie = () => {
  const { showtimesID } = useParams()

  const { data: ticketMovie, isLoading: isLoadingShowtimes } = useQuery({
    queryKey: ['get-chair-showtimes', showtimesID],
    queryFn: () => getChair(showtimesID),
    enabled: !!showtimesID,
  })
  console.log('🚀  ticketMovie:', ticketMovie)

  return (
    <div style={{ display: 'flex', margin: '10px 0' }}>
      {/* <ListChair chair={ticketMovie.danhSachGhe} />
      <DetailTicket detailMovie={ticketMovie.thongTinPhim} /> */}
    </div>
  )
}

export default TicketMovie
