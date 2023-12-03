import { Box } from '@mui/material'
import React, { useState } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { MovieBookingActions } from '../../../../store/slice'

const Chair = ({ ghe }) => {
  const { chairsBooking } = useSelector((state) => state.MovieBooking)
  const dispatch = useDispatch()

  const handleChair = (maGhe, tenGhe, giaVe) => {
    dispatch(
      MovieBookingActions.setChairsBooking({
        tenGhe,
        maGhe,
        giaVe,
      })
    )
  }
  const isChairBooked = chairsBooking.some((chair) => chair.maGhe === ghe.maGhe)

  const { tenGhe, maGhe, loaiGhe, taiKhoanNguoiDat, giaVe } = ghe

  return (
    <button
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
    </button>
  )
}

export default Chair
