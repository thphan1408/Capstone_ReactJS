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
  MenuItem,
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
import Swal from 'sweetalert2'
import { editUserApi } from '../../../../../apis/userAPI'

const editUser = ({ handleClose, taiKhoanUser }) => {
  console.log('taiKhoanUser: ', taiKhoanUser)
  const queryClient = useQueryClient()
  const { handleSubmit, register, control, setValue, watch } = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUP_CODE,
      maLoaiNguoiDung: '',
      hoTen: '',
    },
  })

  // useQuery({queryKey: ['list-movie-admin'] })
  const { mutate: handleEditUser, isPending } = useMutation({
    mutationFn: (payload) => {
      editUserApi(payload)
    },
    onSuccess: () => {
      handleClose()

      Swal.fire({
        icon: 'success',
        title: 'Cập nhật người dùng thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-user')
        }
      })
    },
  })
  const onSubmit = (userInfor) => {
    console.log('userInfor: ', userInfor)
    // handleEditUser(userInfor)
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
                  label="Tài khoản"
                  fullWidth
                  {...register('taiKhoan')}
                />
                <TextField label="Họ tên" fullWidth {...register('hoTen')} />

                <TextField label="Email" fullWidth {...register('email')} />
                <TextField
                  label="Số điện thoại"
                  fullWidth
                  {...register('soDt')}
                />

                <Controller
                  control={control}
                  name="maLoaiNguoiDung"
                  render={({ field }) => {
                    return (
                      <TextField
                        select
                        fullWidth
                        label="Loại người dùng"
                        {...field}
                      >
                        <MenuItem value="QuanTri">Quản Trị</MenuItem>
                        <MenuItem value="KhachHang">Khách Hàng</MenuItem>
                      </TextField>
                    )
                  }}
                />

                <TextField
                  label="Mật khẩu"
                  type="password"
                  fullWidth
                  {...register('matKhau')}
                />

                <LoadingButton
                  loading={isPending}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Cập nhật người dùng
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default editUser
