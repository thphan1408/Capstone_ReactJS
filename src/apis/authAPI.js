import fetcher from './fetcher'

export const checkRole = async () => {
  try {
    const response = await fetcher.post('/QuanLyNguoiDung/ThongTinTaiKhoan')
    // console.log("🚀  response:", response)
    console.log('response: ', response)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
