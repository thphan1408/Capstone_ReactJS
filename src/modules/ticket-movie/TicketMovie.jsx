import React from 'react'
import ListChair from './List-Chair/ListChair'
import { useParams } from 'react-router-dom'
const TicketMovie = () => {
  const { showtimesID } = useParams()

  return (
    <div style={{ display: 'flex', margin: '10px 0' }}>
      <ListChair showtimesID={showtimesID} />
    </div>
  )
}

export default TicketMovie
