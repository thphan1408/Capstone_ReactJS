import fetcher from './fetcher'

export const getListUser = async () => {
  try {
    const response = await fetcher.get('/QuanLyNguoiDung/LayDanhSachNguoiDung')
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
export const signupAPI = async (payload) => {
  try {
    // console.log(payload)
    // payload: {taiKhoan: "", ...}
    const response = await fetcher.post('/QuanLyNguoiDung/DangKy', payload)
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const signinAPI = async (payload) => {
  try {
    const response = await fetcher.post('/QuanLyNguoiDung/DangNhap', payload)
    // console.log('response: ', response)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const infoUserAPI = async () => {
  try {
    const response = await fetcher.post('/QuanLyNguoiDung/ThongTinTaiKhoan')
    // console.log("🚀  response:", response)

    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
