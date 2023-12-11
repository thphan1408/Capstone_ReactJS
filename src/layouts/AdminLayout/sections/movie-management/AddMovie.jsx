import React, { useEffect } from 'react'
import Rating from '@mui/material/Rating'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, Grid, Stack, TextField, Typography, Button } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import { GROUP_CODE } from '../../../../constants'
import { addMovieAPI } from '../../../../apis/movieAPI'

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

const AddMovie = () => {
  const { handleSubmit, register, control, setValue, watch } = useForm({
    defaultValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      maNhom: GROUP_CODE,
      ngayKhoiChieu: '',
      sapChieu: true,
      dangChieu: false,
      hot: true,
      danhGia: '',
      hinhAnh: undefined,
    },
  })

  const queryClient = useQueryClient()

  // useQuery({queryKey: ['list-movie-admin'] })
  const { mutate: handleAddMovie, isPending } = useMutation({
    mutationFn: (payload) => {
      addMovieAPI(payload)
    },
    onSuccess: () => {
      //call API
      queryClient.invalidateQueries({ queryKey: ['list-movie'] })
    },
  })

  const file = watch('hinhAnh') // [0]

  const previewImage = (file) => {
    return URL.createObjectURL(file)
  }

  const onSubmit = (values) => {
    // console.log('🚀  values:', values)
    const formData = new FormData()
    formData.append('tenPhim', values.tenPhim)
    formData.append('trailer', values.trailer)
    formData.append('moTa', values.moTa)
    formData.append('maNhom', values.maNhom)
    formData.append('sapChieu', values.sapChieu)
    formData.append('dangChieu', values.dangChieu)
    formData.append('hot', values.hot)
    formData.append('danhGia', values.danhGia)
    formData.append('hinhAnh', values.hinhAnh[0])
    handleAddMovie(formData)
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
                <TextField
                  label="Tên phim"
                  fullWidth
                  {...register('tenPhim')}
                />
                <TextField label="Trailer" fullWidth {...register('trailer')} />
                <TextField label="Mô tả" fullWidth {...register('moTa')} />
                <Controller
                  control={control}
                  name="ngayKhoiChieu"
                  render={(field) => {
                    return (
                      <DatePicker
                        label="Ngày chiếu"
                        format="DD/MM/YYYY"
                        onChange={(date) => {
                          const value = dayjs(date).format('DD/MM/YYYY')
                          setValue('ngayKhoiChieu', value)
                        }}
                        {...field}
                      />
                    )
                  }}
                />

                {/* <TextField
                  label="Đánh giá"
                  fullWidth
                  {...register('danhGia')}
                /> */}

                <Stack direction={'row'} spacing={1}>
                  <Typography component={'h2'}>Đánh giá:</Typography>
                  <Controller
                    control={control}
                    name="danhGia"
                    render={() => {
                      return (
                        <Rating
                          name="size-medium"
                          defaultValue={0}
                          onChange={(event) => {
                            setValue('danhGia', event.target.defaultValue)
                          }}
                        />
                      )
                    }}
                  />
                </Stack>
                {!file && (
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
                    />
                  </Button>
                )}

                {file?.length > 0 && (
                  <>
                    <img src={previewImage(file[0])} width={240} />
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
