import { useQuery } from '@tanstack/react-query'
import React from 'react'

const DetailTicket = ({ detailMovie }) => {
  // console.log('🚀  detailMovie:', detailMovie)
  return (
    <div>
      <table border="1">
        <thead></thead>
        <tbody>
          <tr>0VND</tr>
          <tr>
            <td>Cụm Rạp:</td>
            <td>{detailMovie.tenCumRap}</td>
          </tr>
          <tr>
            <td>Địa Chỉ:</td>
            <td>{detailMovie.diaChi}</td>
          </tr>
          <tr>
            <td>Rạp:</td>
            <td>{detailMovie.tenRap}</td>
          </tr>
          <tr>
            <td>Ngày Giờ Chiếu:</td>
            <td>{detailMovie.ngayChieu + '-' + detailMovie.gioChieu}</td>
          </tr>
          <tr>
            <td>Tên Phim:</td>
            <td>{detailMovie.tenPhim}</td>
          </tr>
          <tr>
            <td>Chọn:</td>
            <td></td>
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
