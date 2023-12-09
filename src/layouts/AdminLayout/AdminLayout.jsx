import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/UserContext/UserContext'
import { PATH } from '../../routes/path'
import Header from '../../components/Admin/Header/Header'
const AdminLayout = () => {
  const { currentUser } = useAuth()
  // console.log('🚀  currentUser:', currentUser)

  if (currentUser && currentUser.maLoaiNguoiDung === 'QuanTri') {
    return (
      <>
        <Header />
        <Outlet />
      </>
    )
  }
  return <Navigate to={PATH.HOME} />
}

export default AdminLayout
