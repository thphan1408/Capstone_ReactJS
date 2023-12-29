import React from 'react'
import Chair from './Chair'
import { useQuery } from '@tanstack/react-query'
import {
  Container,
  Box,
  Typography,
  Stack,
  Grid,
  useMediaQuery,
} from '@mui/material'
const ListChair = ({ chair }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const isTabletScreen = useMediaQuery('(max-width:960px)')

  return (
    <Box>
      <Box
        sx={{
          background: '#333',
          marginBottom: 3,
          height: '50px',
          color: '#FFF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h4'}>SCREEN</Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isSmallScreen
            ? 'repeat(8, 1fr)'
            : isTabletScreen
            ? 'repeat(12, 1fr)'
            : 'repeat(16, 1fr)',
          gap: '10px',
        }}
      >
        {chair &&
          chair.map((ghe) => {
            return <Chair ghe={ghe} key={ghe.maGhe} />
          })}
      </Box>
      <Stack
        direction={isSmallScreen ? 'row' : 'row'}
        alignItems="center"
        justifyContent="center"
        margin="20px 0"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: isSmallScreen
              ? '10px 0'
              : isTabletScreen
              ? '10px 0'
              : '0 50px',
          }}
        >
          <Box className="Chair booked">X</Box>
          Đã đặt
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: isSmallScreen
              ? '10px 0'
              : isTabletScreen
              ? '10px 0'
              : '0 50px',
          }}
        >
          <Box className="Chair regularChair"></Box>
          Thường{' '}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: isSmallScreen
              ? '10px 0'
              : isTabletScreen
              ? '10px 0'
              : '0 50px',
          }}
        >
          <Box className="Chair vipChair"></Box>
          Vip{' '}
        </Box>
      </Stack>
    </Box>
  )
}

export default ListChair
