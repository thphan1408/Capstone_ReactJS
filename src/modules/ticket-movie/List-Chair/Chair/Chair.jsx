import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { MovieBookingActions } from '../../../../store/slice'
import { useParams } from 'react-router-dom'
import { AddBox } from '@mui/icons-material'

const Chair = ({ ghe }) => {
  // console.log('🚀  ghe:', ghe)
  const { tenGhe, maGhe, loaiGhe, taiKhoanNguoiDat, giaVe, daDat } = ghe
  const { chairsBooking } = useSelector((state) => state.MovieBooking)
  const dispatch = useDispatch()

  const handleChair = (maGhe, tenGhe, giaVe, taiKhoanNguoiDat) => {
    dispatch(
      MovieBookingActions.setChairsBooking({
        tenGhe,
        maGhe,
        giaVe,
        taiKhoanNguoiDat,
      })
    )
  }
  // dispatch(MovieBookingActions.resetChairBooking())
  const isChairBooked = chairsBooking.some((chair) => chair.maGhe === ghe.maGhe)

  return (
    <Box
      onClick={() => handleChair(maGhe, tenGhe, giaVe)}
      disabled={taiKhoanNguoiDat !== null}
      className={cn('Chair', {
        regularChair: loaiGhe === 'Thuong',
        vipChair: loaiGhe === 'Vip',
        booked: taiKhoanNguoiDat !== null,
        booking: isChairBooked,
      })}
    >
      {taiKhoanNguoiDat !== null ? 'X' : tenGhe}
    </Box>
  )
}

export default Chair
