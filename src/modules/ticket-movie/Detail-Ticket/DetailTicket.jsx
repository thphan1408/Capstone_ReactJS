import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../routes/path'
import { ticketSet } from '../../../apis/ticketAPI'
import { LoadingButton } from '@mui/lab'
import { useAuth } from '../../../contexts/UserContext/UserContext'
import Paper from '@mui/material/Paper'

const DetailTicket = (props) => {
  const { detailMovie, showtimesID } = props
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()

  const { chairsBooking } = useSelector((state) => state.MovieBooking)

  const ticketInfo = {
    maLichChieu: showtimesID,
    danhSachVe: chairsBooking,
  }

  const { mutate: handleTicket, isPending } = useMutation({
    mutationFn: (ticketInfo) => ticketSet(ticketInfo),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries('get-chair-showtimes')
        Swal.fire({
          icon: 'success',
          title: 'Đặt vé thành công',
          text: 'Kiểm tra trong lịch sử đặt vé',
          confirmButtonText: 'Đồng ý',
        }).then((result) => {
          if (result.isConfirmed) {
            // Chuyển trang lịch sử đặt vé
          }
        })
      }
    },
    onError: (error) => {
      console.error('🚀  error:', error)
    },
  })

  const handleDatve = () => {
    if (chairsBooking.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Bạn chưa chọn ghế',
        text: 'Vui lòng chọn ghế!!!',
        confirmButtonText: 'Đã hiểu',
      })
    } else if (!currentUser) {
      Swal.fire({
        icon: 'error',
        title: 'Bạn chưa đăng nhập',
        text: 'Bạn có muốn đăng nhập không ?',
        confirmButtonText: 'Đồng ý',
        showDenyButton: true,
        denyButtonText: 'Không',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(PATH.SIGN_IN)
        }
      })
      return
    } else {
      handleTicket(ticketInfo)
    }
  }

  const total = chairsBooking.reduce((tongTien, item) => {
    return (tongTien += item.giaVe)
  }, 0)

  return (
    <Box>
      {/* <table border="1">
        <thead></thead>
        <tbody>
          <tr>
            {total.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </tr>
          <tr>
            <td>Cụm Rạp:</td>
            <td>{detailMovie?.tenCumRap}</td>
          </tr>
          <tr>
            <td>Địa Chỉ:</td>
            <td>{detailMovie?.diaChi}</td>
          </tr>
          <tr>
            <td>Rạp:</td>
            <td>{detailMovie?.tenRap}</td>
          </tr>
          <tr>
            <td>Ngày Giờ Chiếu:</td>
            <td>{detailMovie?.ngayChieu + '-' + detailMovie?.gioChieu}</td>
          </tr>
          <tr>
            <td>Tên Phim:</td>
            <td>{detailMovie?.tenPhim}</td>
          </tr>
          <tr>
            <td>Chọn:</td>
            <td>
              {chairsBooking.map((ghe) => {
                return ghe.tenGhe + ', '
              })}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={handleDatve}
              >
                Đặt vé
              </Button>
            </td>
          </tr>
        </tbody>
      </table> */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} sx={{ textAlign: 'center', fontSize: 28 }}>
                {total.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>Cụm Rạp:</TableCell>
              <TableCell sx={{ fontSize: 18 }}>
                {detailMovie?.tenCumRap}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>Địa chỉ:</TableCell>
              <TableCell sx={{ fontSize: 18 }}>{detailMovie?.diaChi}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>Rạp:</TableCell>
              <TableCell sx={{ fontSize: 18 }}>{detailMovie?.tenRap}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>Ngày giờ chiếu:</TableCell>
              <TableCell sx={{ fontSize: 18 }}>
                {detailMovie?.ngayChieu + ' - ' + detailMovie?.gioChieu}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>Tên Phim:</TableCell>
              <TableCell sx={{ fontSize: 18 }}>
                {detailMovie?.tenPhim}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>Ghế:</TableCell>
              <TableCell sx={{ fontSize: 18 }}>
                {chairsBooking.map((ghe) => {
                  return ghe.tenGhe + ', '
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <LoadingButton
                  type="button"
                  variant="contained"
                  fullWidth
                  onClick={handleDatve}
                  size="large"
                  loading={isPending}
                  sx={{ fontSize: 18 }}
                >
                  Đặt vé
                </LoadingButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default DetailTicket
