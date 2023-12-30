import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import { GROUP_CODE } from '../../../../../constants'
import { addMovieAPI } from '../../../../../apis/movieAPI'
import Swal from 'sweetalert2'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const schemaAddMovie = yup.object({
  tenPhim: yup.string().required('Vui lòng nhập thông tin'),
  trailer: yup.string().required('Vui lòng nhập thông tin'),
  moTa: yup.string().required('Vui lòng nhập thông tin'),
  danhGia: yup.number().required('Vui lòng chọn đánh giá'),
  hinhAnh: yup.mixed().required('Vui lòng chọn hình ảnh'),
})

const AddMovie = ({ handleClose }) => {
  const queryClient = useQueryClient()
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      maNhom: GROUP_CODE,
      ngayKhoiChieu: '',
      sapChieu: false,
      dangChieu: true,
      hot: false,
      danhGia: '',
      hinhAnh: undefined,
    },
    mode: 'all',
    resolver: yupResolver(schemaAddMovie),
  })

  const file = watch('hinhAnh') // [0]

  const { mutate: handleAddMovie, isPending } = useMutation({
    mutationFn: (payload) => {
      addMovieAPI(payload)
    },
    onSuccess: () => {
      handleClose()

      Swal.fire({
        icon: 'success',
        title: 'Thêm phim thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-movie')
        }
      })
    },
  })

  const onSubmit = (values) => {
    const formData = new FormData()
    for (const key in values) {
      if (key !== 'hinhAnh') {
        formData.append(key, values[key])
      } else {
        formData.append('file', values.hinhAnh[0], values.hinhAnh.name)
      }
    }
    handleAddMovie(formData)
  }

  const previewImage = (file) => {
    return URL.createObjectURL(file)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ overflowY: 'auto', maxHeight: '80vh' }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
              <Stack spacing={2}>
                <TextField
                  label="Tên phim"
                  fullWidth
                  error={Boolean(errors.tenPhim)}
                  helperText={errors.tenPhim?.message}
                  {...register('tenPhim')}
                />
                <TextField
                  label="Trailer"
                  fullWidth
                  error={Boolean(errors.trailer)}
                  helperText={errors.trailer?.message}
                  {...register('trailer')}
                />
                <TextField
                  label="Mô tả"
                  error={Boolean(errors.moTa)}
                  helperText={errors.moTa?.message}
                  fullWidth
                  {...register('moTa')}
                />
                <Controller
                  control={control}
                  name="ngayKhoiChieu"
                  render={(field) => (
                    <DatePicker
                      label="Ngày chiếu"
                      format="DD/MM/YYYY"
                      onChange={(date) => {
                        const value = dayjs(date).format('DD/MM/YYYY')
                        setValue('ngayKhoiChieu', value)
                      }}
                      {...field}
                    />
                  )}
                />

                <Stack direction="row" spacing={1}>
                  <Typography component="h2">Đánh giá:</Typography>
                  <Controller
                    control={control}
                    name="danhGia"
                    render={() => (
                      <Rating
                        error={Boolean(errors.danhGia)}
                        helperText={errors.danhGia?.message}
                        name="size-medium"
                        defaultValue={0}
                        max={10}
                        onChange={(event) => {
                          setValue('danhGia', event.target.defaultValue)
                        }}
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography component="h2">Đang chiếu:</Typography>
                  <Controller
                    control={control}
                    name="dangChieu"
                    render={() => (
                      <Switch
                        checked={watch('dangChieu')}
                        onChange={(event) => {
                          setValue('dangChieu', event.target.checked)
                          setValue('sapChieu', !event.target.checked)
                        }}
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography component="h2">Sắp chiếu:</Typography>
                  <Controller
                    control={control}
                    name="sapChieu"
                    render={() => (
                      <Switch
                        checked={watch('sapChieu')}
                        onChange={(event) => {
                          setValue('sapChieu', event.target.checked)
                          setValue('dangChieu', !event.target.checked)
                        }}
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography component="h2">Phim hot:</Typography>
                  <Controller
                    control={control}
                    name="hot"
                    render={() => (
                      <Switch
                        onChange={(event) => {
                          setValue('hot', event.target.checked)
                        }}
                      />
                    )}
                  />
                </Stack>

                {!file || file.length === 0 ? (
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      accept=".png, .gif, .jpg"
                      type="file"
                      {...register('hinhAnh')}
                      error={Boolean(errors.hinhAnh)}
                      helperText={errors.hinhAnh?.message}
                    />
                  </Button>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={previewImage(file[0])}
                        width={100}
                        height={100}
                      />
                    </Box>

                    <Button
                      onClick={() => {
                        setValue('hinhAnh', undefined)
                      }}
                    >
                      Xóa hình
                    </Button>
                  </>
                )}

                <LoadingButton
                  loading={isPending}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Thêm phim
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default AddMovie
