import fetcher from './fetcher'

export const getMovieShowTimes = async (movieID) => {
  try {
    const response = await fetcher.get('/QuanLyRap/LayThongTinLichChieuPhim', {
      params: {
        MaPhim: movieID,
      },
    })
    // console.log('response', response)
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
