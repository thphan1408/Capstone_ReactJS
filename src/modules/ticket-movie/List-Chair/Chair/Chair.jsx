import { Box } from '@mui/material'
import React, { useState } from 'react'
import cn from 'classnames'
const Chair = ({ ghe }) => {
  const { tenGhe, maGhe, loaiGhe, taiKhoanNguoiDat } = ghe

  return (
    <button
      onClick={() => {
        handleChair(tenGhe)
      }}
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
