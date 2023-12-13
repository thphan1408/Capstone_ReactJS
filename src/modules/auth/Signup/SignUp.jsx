import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { GROUP_CODE } from '../../../constants'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { signupAPI } from '../../../apis/userAPI'
import { LoadingButton } from '@mui/lab'
import { Navigate, useNavigate } from 'react-router-dom'
import { PATH } from '../../../routes/path'
import { useAuth } from '../../../contexts/UserContext/UserContext'
import { Helmet } from 'react-helmet-async'
import { bgGradient } from '../../../theme/css'
import { useTheme, alpha } from '@mui/material/styles'

const schemaSignup = yup.object({
  taiKhoan: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .min(6, 'Tài khoản ít nhất 6 ký tự')
    .max(8, 'Tài khoản không quá 8 ký tự'),
  matKhau: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Mật khẩu ít nhất 8 ký tự và bao gồm 1 ký tự đặc biệt, 1 ký tự viết hoa và viết thường'
    ),
  hoTen: yup.string().required('Vui lòng nhập thông tin'),
  email: yup.string().required('Vui lòng nhập thông tin'),
  soDt: yup.string().required('Vui lòng nhập thông tin'),
})

const SignUp = () => {
  const theme = useTheme()

  const { currentUser } = useAuth()

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUP_CODE,
      hoTen: '',
    },
    mode: 'all',
    resolver: yupResolver(schemaSignup),
  })

  const { mutate: handleSignup, isPending } = useMutation({
    mutationFn: (values) => signupAPI(values),
    onSuccess: (values) => {
      navigate(PATH.SIGN_IN)
    },
    onError: (error) => {
      alert('Lỗi rồi')
    },
  })

  // const field = register('taiKhoan')

  // const handleSubmit = () => {
  // do something
  // const innerFunction = () => {}
  // return innerFunction
  // }

  // const fn = handleSubmit()()

  const onSubmit = (values) => {
    // Gọi API
    handleSignup(values)
    // Gọi API xong thì, rediẻct sang trang đăng nhập
  }
  if (currentUser) {
    return <Navigate to={PATH.HOME} />
  }
  return (
    <>
      {/* <Container maxWidth="sm"> */}
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: 'src/assets/background/overlay_4.jpg',
          }),
          height: 1,
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid item lg={8}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: 1 }}
            >
              <Card
                sx={{
                  p: 5,
                  width: 1,
                  mt: 10,
                  maxWidth: 420,
                }}
              >
                <form
                  onSubmit={handleSubmit(
                    // (values) => {onSubmit(values)},
                    onSubmit
                    // (errors) => {}
                  )}
                >
                  <Stack spacing={3}>
                    <TextField
                      label="Họ tên"
                      fullWidth
                      error={Boolean(errors.hoTen)}
                      helperText={Boolean(errors.hoTen) && errors.hoTen.message}
                      {...register('hoTen')}
                    ></TextField>
                    <TextField
                      label="Email"
                      fullWidth
                      error={Boolean(errors.email)}
                      helperText={Boolean(errors.email) && errors.email.message}
                      {...register('email')}
                    ></TextField>

                    <TextField
                      label="Tài khoản"
                      fullWidth
                      error={Boolean(errors.taiKhoan)}
                      helperText={
                        Boolean(errors.taiKhoan) && errors.taiKhoan.message
                      }
                      {...register('taiKhoan')}
                    ></TextField>

                    <TextField
                      label="Mật khẩu"
                      type="password"
                      error={Boolean(errors.matKhau)}
                      helperText={
                        Boolean(errors.matKhau) && errors.matKhau.message
                      }
                      fullWidth
                      {...register('matKhau')}
                    ></TextField>
                    <TextField
                      label="Số điện thoại"
                      fullWidth
                      error={Boolean(errors.soDt)}
                      helperText={Boolean(errors.soDt) && errors.soDt.message}
                      {...register('soDt')}
                    ></TextField>

                    <LoadingButton
                      variant="contained"
                      fullWidth
                      type="submit"
                      size="large"
                      loading={isPending}
                    >
                      Đăng ký
                    </LoadingButton>
                  </Stack>
                </form>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </>
  )
}

export default SignUp
