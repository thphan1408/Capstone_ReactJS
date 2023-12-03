import React from 'react'
import Chair from './Chair'
import { useQuery } from '@tanstack/react-query'
import { Container, Box } from '@mui/material'
const ListChair = ({ chair }) => {
  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 1fr)',
          gridTemplateRows: 'repeat(10, 1fr)',
          gap: '5px',
        }}
      >
        {chair &&
          chair.map((ghe) => {
            return <Chair ghe={ghe} />
          })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box className="Chair booked">X</Box>Đã đặt
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 50px',
            alignItems: 'center',
          }}
        >
          <Box className="Chair regularChair"></Box>Thường{' '}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box className="Chair vipChair"></Box>Vip{' '}
        </Box>
      </Box>
    </div>
  )
}

export default ListChair
