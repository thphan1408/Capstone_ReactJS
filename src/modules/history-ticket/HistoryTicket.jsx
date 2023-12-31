import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useHistoryTicket } from '../../contexts/UserContext/UserContext'

const HistoryTicket = () => {
  const { infoUser } = useHistoryTicket()

  const [info, setInfo] = useState([])

  useEffect(() => {
    setInfo(infoUser)
  }, [infoUser])

  return <div>History ticket</div>
}

export default HistoryTicket
