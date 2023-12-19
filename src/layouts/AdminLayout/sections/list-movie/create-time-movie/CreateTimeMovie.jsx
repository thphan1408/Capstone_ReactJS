import React, { useEffect, useState } from 'react'
import { Box, Grid, Stack, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import Swal from 'sweetalert2'
import CinemaComplex from './CinemaComplex/CinemaComplex'
import { getInfoCinemaSystem } from '../../../../../apis/cinemaAPI'
import { DateTimePicker } from '@mui/x-date-pickers'
import { createTimeAPI } from '../../../../../apis/ticketAPI'

const CreateTimeMovie = ({ maPhim, handleClose }) => {
  const [selectedCinema, setSelectedCinema] = useState('')

  // API - Lấy thông tin hệ thống rạp
  const { data } = useQuery({
    queryKey: ['get-info-cinema-system'],
    queryFn: () => getInfoCinemaSystem(),
  })

  // API - Tạo lịch chiếu
  const { mutate: handleCreateTime, isPending } = useMutation({
    mutationFn: (payload) => {
      createTimeAPI(payload)
    },
    onSuccess: () => {
      handleClose()

      // Hiển thị thông báo thành công (nếu cần)
      Swal.fire({
        icon: 'success',
        title: 'Tạo lịch thành công',
        confirmButtonText: 'Ok luôn',
      })
    },
  })

  // Form - Tạo lịch chiếu
  const { handleSubmit, register, control, setValue } = useForm({
    defaultValues: {
      maPhim: maPhim,
      ngayChieuGioChieu: '',
      giaVe: '',
      maRap: data?.maHeThongRap || '',
    },
  })

  useEffect(() => {
    setValue('maRap', selectedCinema || '')
  }, [selectedCinema, setValue])

  const handleCinemaChange = (value) => {
    setSelectedCinema(value)
  }

  const onSubmit = (values) => {
    handleCreateTime(values)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          spacing={3}
        >
          <Grid item md={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} direction={'column'}>
                <Controller
                  control={control}
                  name="maRap"
                  render={({ field }) => {
                    return (
                      <TextField
                        select
                        fullWidth
                        label="Cụm rạp"
                        onChange={(event) =>
                          handleCinemaChange(event.target.value)
                        }
                        {...field}
                      >
                        {data?.map((system, index) => {
                          return (
                            <CinemaComplex
                              key={index}
                              maHeThongRap={system.maHeThongRap}
                              onCinemaChange={handleCinemaChange}
                            />
                          )
                        })}
                      </TextField>
                    )
                  }}
                />

                <Controller
                  control={control}
                  name="ngayChieuGioChieu"
                  render={(field) => {
                    return (
                      <DateTimePicker
                        label="Ngày chiếu"
                        format="DD/MM/YYYY HH:mm:ss"
                        views={[
                          'day',
                          'month',
                          'year',
                          'hours',
                          'minutes',
                          'seconds',
                        ]}
                        onChange={(date) => {
                          const formattedDate = dayjs(date).format(
                            'DD/MM/YYYY HH:mm:ss'
                          )
                          setValue('ngayChieuGioChieu', formattedDate)
                        }}
                        {...field}
                      />
                    )
                  }}
                />

                <TextField label="Giá vé" fullWidth {...register('giaVe')} />

                <LoadingButton variant="contained" size="large" type="submit">
                  Tạo lịch chiếu
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default CreateTimeMovie
