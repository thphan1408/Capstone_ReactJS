import { Button, Grid, Stack, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signinAPI } from '../../../apis/userAPI'
import { Navigate, useNavigate } from 'react-router-dom'
import { PATH } from '../../../routes/path'
import { LoadingButton } from '@mui/lab'
import { CURRENT_USER } from '../../../constants'
import { useAuth } from '../../../contexts/UserContext/UserContext'

const SignIn = () => {
  const { currentUser, handleSignin: handleSigninContext } = useAuth()
  const navigate = useNavigate()

  // Trong useForm nhận vào 1 obj, có key là defaultValues
  const { handleSubmit, register } = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
    },
  })
  // console.log('🚀  handleSubmit:', handleSubmit)

  const { mutate: handleSignin, isPending } = useMutation({
    mutationFn: (values) => signinAPI(values),
    onSuccess: (values) => {
      // console.log('🚀  values:', values)
      // localStorage.setItem(CURRENT_USER, JSON.stringify(values))
      // values là thông tin user
      handleSigninContext(values)
      if (values.maLoaiNguoiDung === 'KhachHang') {
        navigate(PATH.HOME)
      }
      if (values.maLoaiNguoiDung === 'QuanTri') {
        navigate(PATH.ADMIN)
      }
    },
    onError: (error) => {
      console.log('🚀  error:', error)
    },
  })

  const onSubmit = (values) => {
    // console.log(values)
    handleSignin(values) // {taiKhoan: '', matKhau: ''}
  }

  if (currentUser) {
    return <Navigate to={PATH.HOME} />
  }

  return (
    <>
      SignIn
      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        spacing={3}
      >
        <Grid item md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Tài khoản"
                fullWidth
                name="taiKhoan"
                {...register('taiKhoan')}
              />
              <TextField
                label="Mật khẩu"
                type="password"
                fullWidth
                name="matKhau"
                {...register('matKhau')}
              />
              <LoadingButton
                type="submit"
                variant="outlined"
                loading={isPending}
              >
                Đăng nhập
              </LoadingButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default SignIn
