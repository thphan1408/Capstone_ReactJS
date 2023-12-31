import { GROUP_CODE } from '../constants'
import fetcher from './fetcher'

export const getListUser = async () => {
  try {
    const response = await fetcher.get(
      '/QuanLyNguoiDung/LayDanhSachNguoiDung',
      {
        params: {
          maNhom: GROUP_CODE,
        },
      }
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
export const getListUserPagination = async (
  tuKhoa,
  soTrang,
  soPhanTuTrenTrang
) => {
  const response = await fetcher.get(
    '/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang',
    tuKhoa
      ? {
          params: {
            tuKhoa,
            MaNhom: GROUP_CODE,
            soTrang,
            soPhanTuTrenTrang,
          },
        }
      : {
          params: {
            MaNhom: GROUP_CODE,
            soTrang,
            soPhanTuTrenTrang,
          },
        }
  )
  return response.data.content
}
export const signupAPI = async (payload) => {
  try {
    const response = await fetcher.post('/QuanLyNguoiDung/DangKy', payload)
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const signinAPI = async (payload) => {
  try {
    const response = await fetcher.post('/QuanLyNguoiDung/DangNhap', payload)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const addUserApi = async (user) => {
  const response = await fetcher.post('/QuanLyNguoiDung/ThemNguoiDung', user)
  return response.data.content
}
export const editUserApi = async (user) => {
  const response = await fetcher.post(
    '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
    user
  )
  return response.data.content
}
export const deleteUserAPI = async (taiKhoan) => {
  const response = await fetcher.delete('/QuanLyNguoiDung/XoaNguoiDung', {
    params: {
      TaiKhoan: taiKhoan,
    },
  })
  return response.data.content
}
export const infoUserAPI = async (userId) => {
  try {
    const response = await fetcher.post(
      '/QuanLyNguoiDung/LayThongTinNguoiDung',
      null,
      {
        params: {
          taiKhoan: userId,
        },
      }
    )

    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
