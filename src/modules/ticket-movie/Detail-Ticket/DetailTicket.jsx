import { useQuery } from '@tanstack/react-query'
import { current } from 'immer'
import React from 'react'
import { useSelector } from 'react-redux'

const DetailTicket = ({ detailMovie }) => {
  // console.log('🚀  detailMovie:', detailMovie)
  const { chairsBooking } = useSelector((state) => state.MovieBooking)
  console.log('🚀  chairsBooking:', chairsBooking)

  let totalPriceTicket = 0

  if (chairsBooking.length) {
    chairsBooking.map((gia) => {
      return (totalPriceTicket += gia.giaVe)
    })
  }

  return (
    <div>
      <table border="1">
        <thead></thead>
        <tbody>
          <tr>{totalPriceTicket.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</tr>
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
                return ghe.tenGhe + ", "
              })}
            </td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DetailTicket
