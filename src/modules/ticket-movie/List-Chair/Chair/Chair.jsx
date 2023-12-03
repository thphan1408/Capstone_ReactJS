import { Box } from '@mui/material'
import React from 'react'
import cn from 'classnames'
const Chair = ({ ghe }) => {
  const { tenGhe, maGhe, loaiGhe, taiKhoanNguoiDat } = ghe
  return (
    <button
      disabled={taiKhoanNguoiDat !== null}
      className={cn('Chair', {
        manualChair: loaiGhe === 'Thuong',
        vipChair: loaiGhe === 'Vip',
        booked: taiKhoanNguoiDat !== null,
        booking: taiKhoanNguoiDat === null,
      })}
    >
      {taiKhoanNguoiDat !== null ? 'X' : tenGhe}
    </button>
  )
}

export default Chair
