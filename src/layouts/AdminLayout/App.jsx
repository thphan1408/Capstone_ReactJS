import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/UserContext/UserContext'
import Router from './routes/sections'
import { PATH } from '../../routes/path'

// ----------------------------------------------------------------------

export default function App() {
  const { currentUser } = useAuth()
  if (currentUser?.maLoaiNguoiDung !== 'QuanTri') {
    return <Navigate to={PATH.HOME} />
  }
  return <Router />
}
