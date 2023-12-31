import { GROUP_CODE } from '../constants'
import fetcher from './fetcher'

export const getBannersAPI = async () => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayDanhSachBanner')
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
    return response.data.content
  } catch (error) {}
}
export const getListMoviePagination = async (
  tuKhoa,
  soTrang,
  soPhanTuTrenTrang
) => {
  const response = await fetcher.get(
    '/QuanLyPhim/LayDanhSachPhimPhanTrang',
    tuKhoa
      ? {
          params: {
            maNhom: GROUP_CODE,
            tenPhim: tuKhoa,
            soTrang,
            soPhanTuTrenTrang,
          },
        }
      : {
          params: {
            maNhom: GROUP_CODE,
            soTrang,
            soPhanTuTrenTrang,
          },
        }
  )

  return response.data.content
}
export const getMovieDetailsAPI = async (movieID) => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayThongTinPhim', {
      params: {
        MaPhim: movieID,
      },
    })
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

// DELETE movie api
export const deleteMovieAPI = async (movieID) => {
  try {
    const response = await fetcher.delete('/QuanLyPhim/XoaPhim', {
      params: {
        MaPhim: movieID,
      },
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

// UPDATE movie api
export const updateMovieAPI = async (payload) => {
  try {
    const response = await fetcher.post(
      '/QuanLyPhim/CapNhatPhimUpload',
      payload
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
