import fetcher from './fetcher'

export const getChair = async (showtimesId) => {
  console.log('showtimesId: ', showtimesId)
  try {
    const response = await fetcher.get('/QuanLyDatVe/LayDanhSachPhongVe/', {
      params: {
        MaLichChieu: showtimesId,
      },
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
