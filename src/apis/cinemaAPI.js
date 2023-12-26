import fetcher from './fetcher'

export const getMovieShowTimes = async (movieID) => {
  try {
    const response = await fetcher.get('/QuanLyRap/LayThongTinLichChieuPhim', {
      params: {
        MaPhim: movieID,
      },
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const getInfoCinemaSystem = async () => {
  try {
    const response = await fetcher.get('/QuanLyRap/LayThongTinHeThongRap')
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const getInfoCinemaBySystem = async (maHeThongRap) => {
  try {
    const response = await fetcher.get(
      '/QuanLyRap/LayThongTinCumRapTheoHeThong',
      {
        params: {
          maHeThongRap,
        },
      }
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
