import React, { useEffect, useState } from 'react'
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useForm, Controller, useWatch } from 'react-hook-form'
import dayjs from 'dayjs'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import Swal from 'sweetalert2'
import {
  getInfoCinemaBySystem,
  getInfoCinemaSystem,
} from '../../../../../apis/cinemaAPI'
import { DateTimePicker } from '@mui/x-date-pickers'
import { createTimeAPI } from '../../../../../apis/ticketAPI'

const schemaCreateTime = yup.object({
  maHeThongRap: yup.string().required('Vui lòng chọn hệ thống rạp'),
  maRap: yup.string().required('Vui lòng chọn cụm rạp'),
  giaVe: yup
    // ngayChieuGioChieu: yup.date().required('Vui lòng cho biết ngày chiếu'),
    .number()
    .required('Vui lòng nhập giá vé')
    .min(75000)
    .max(200000)
    .typeError('Giá vé phải là số'),
})

const CreateTimeMovie = ({ maPhim, handleClose }) => {
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
      Swal.fire({
        icon: 'success',
        title: 'Tạo lịch thành công',
        confirmButtonText: 'Ok luôn',
      })
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra khi tạo lịch',
        confirmButtonText: 'Đồng ý',
      })
    },
  })

  // Form - Tạo lịch chiếu
  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maPhim: maPhim,
      ngayChieuGioChieu: '',
      giaVe: '',
      maRap: '',
    },
    mode: 'all',
    resolver: yupResolver(schemaCreateTime),
  })

  const maHeThongRap = useWatch({ control, name: 'maHeThongRap' })

  const { data: CinemaBySystem } = useQuery({
    queryKey: ['get-info-cinema-by-system', maHeThongRap],
    queryFn: () => {
      if (maHeThongRap) {
        return getInfoCinemaBySystem(maHeThongRap)
      } else {
        return Promise.resolve([])
      }
    },
  })

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
                  name="maHeThongRap"
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Chọn rạp
                        </InputLabel>
                        <Select
                          {...field}
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Cụm rạp"
                        >
                          {data?.map((item) => {
                            return (
                              <MenuItem
                                key={item.maHeThongRap}
                                value={item.maHeThongRap}
                              >
                                {item.tenHeThongRap}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    )
                  }}
                />

                <Controller
                  name="maRap"
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Chọn cụm rạp
                        </InputLabel>
                        <Select
                          {...field}
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Chọn cụm rạp"
                          defaultValue={getValues('maRap')}
                        >
                          {CinemaBySystem?.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.maCumRap}>
                                {item.tenCumRap}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
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
                {/* <span
                  style={{
                    color: '#FF5630',
                    fontSize: '12px',
                    margin: '3px 14px 0px',
                  }}
                >
                  {errors.ngayChieuGioChieu?.message}
                </span> */}

                <TextField
                  label="Giá vé"
                  type="number"
                  error={Boolean(errors.giaVe)}
                  helperText={Boolean(errors.giaVe) && errors.giaVe.message}
                  fullWidth
                  {...register('giaVe')}
                />

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
