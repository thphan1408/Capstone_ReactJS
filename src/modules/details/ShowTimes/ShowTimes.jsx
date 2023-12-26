import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getMovieShowTimes } from '../../../apis/cinemaAPI'
import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const ShowTimes = ({ movieID }) => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const { data = {}, isLoading } = useQuery({
    queryKey: ['movie-showtimes', movieID],
    queryFn: () => getMovieShowTimes(movieID),
    enabled: !!movieID,
  })

  const cinemaSystems = data.heThongRapChieu || []

  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setValue(cinemaSystems[0].maHeThongRap)
    }
  }, [cinemaSystems])

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          variant="scrollable"
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {cinemaSystems.map((item) => {
            return (
              <Tab
                value={value}
                onClick={() => handleChange(item.maHeThongRap)}
                label={<img src={item.logo} alt="..." style={{ width: 45 }} />}
                {...a11yProps(item.maHeThongRap)}
                key={item.maHeThongRap}
              />
            )
          })}
        </Tabs>
        {cinemaSystems.map((item) => {
          return (
            <TabPanel
              value={value}
              index={item.maHeThongRap}
              key={item.maHeThongRap}
            >
              {item.cumRapChieu.map((rap) => {
                return (
                  <Box sx={{ mb: 3 }} key={rap.maCumRap}>
                    <Typography component="h4">{rap.tenCumRap}</Typography>
                    <Stack spacing={2} direction={'row'}>
                      {rap.lichChieuPhim.map((lichChieu) => {
                        const times = dayjs(lichChieu.ngayChieuGioChieu).format(
                          'DD/MM/YYYY ~ HH:mm'
                        )
                        return (
                          <Box key={lichChieu.maLichChieu}>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                navigate(`/ticket/${lichChieu.maLichChieu}`)
                              }}
                            >
                              {times}
                            </Button>
                          </Box>
                        )
                      })}
                    </Stack>
                  </Box>
                )
              })}
            </TabPanel>
          )
        })}
      </Box>
    </Container>
  )
}

export default ShowTimes
