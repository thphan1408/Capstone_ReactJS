import { GROUP_CODE } from '../constants'
import fetcher from './fetcher'

export const getBannersAPI = async () => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayDanhSachBanner')
    // console.log('response', response)
    return response.data.content // []
  } catch (error) {}
}

export const getListMovieAPI = async () => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayDanhSachPhim', {
      params: {
        maNhom: GROUP_CODE,
      },
    })
    // console.log('response', response.data.content)
    return response.data.content
  } catch (error) {}
}

export const getMovieDetailsAPI = async (movieID) => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayThongTinPhim', {
      params: {
        MaPhim: movieID,
      },
    })
    // console.log('response', response)
    return response.data.content
  } catch (error) {}
}

// ADD movie api
export const addMovieAPI = async (payload) => {
  try {
    const response = await fetcher.post(
      '/QuanLyPhim/ThemPhimUploadHinh',
      payload
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
