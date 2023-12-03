import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeModule from './modules/home'
import NotFound from './modules/not-found'
import MovieLayout from './layouts/MovieLayout/MovieLayout'
import Details from './modules/details'
import { PATH } from './routes/path'
import SignIn from './modules/auth/Signin/SignIn'
import SignUp from './modules/auth/Signup/SignUp'
import { UserProvider } from './contexts/UserContext/UserContext'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import AddMovie from './modules/admin/MovieManagement/AddMovie'
import Memo from './modules/renders/Memo'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TicketMovie from './modules/ticket-movie/TicketMovie'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.HOME} element={<MovieLayout />}>
            <Route index element={<HomeModule />} />
            <Route path="movie/:movieID" element={<Details />} />
            <Route path={PATH.SIGN_IN} element={<SignIn />} />
            <Route path={PATH.SIGN_UP} element={<SignUp />} />
            <Route path="ticket/:movieID" element={<TicketMovie />} />
          </Route>

          {/* <Route path="prevent-re-render" element={<Memo />} /> */}

          <Route path={PATH.ADMIN} element={<AdminLayout />}>
            <Route index element={<AddMovie />} />
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
