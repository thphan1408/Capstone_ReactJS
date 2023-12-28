import React, {lazy} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeModule from './modules/home'
import NotFound from './modules/not-found'
import MovieLayout from './layouts/MovieLayout/MovieLayout'
import Details from './modules/details'
import { PATH } from './routes/path'
import SignIn from './modules/auth/Signin/SignIn'
import SignUp from './modules/auth/Signup/SignUp'
import { UserProvider } from './contexts/UserContext/UserContext'
import Memo from './modules/renders/Memo'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TicketMovie from './modules/ticket-movie/TicketMovie'
import HistoryTicket from './modules/history-ticket/HistoryTicket'
import AdminPage from './layouts/AdminLayout/App.jsx'
import NotFoundPage from './layouts/AdminLayout/sections/error/not-found-view.jsx'
import UserPage from './layouts/AdminLayout/pages/user.jsx'
import ThemeProvider from './theme'
// import ListMovie from './layouts/AdminLayout/pages/list-movie.jsx'
const ListMovie = lazy(() => import('./layouts/AdminLayout/pages/list-movie.jsx'))

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path={PATH.HOME} element={<MovieLayout />}>
              <Route index element={<HomeModule />} />
              <Route path="movie/:movieID" element={<Details />} />
              <Route path={PATH.SIGN_IN} element={<SignIn />} />
              <Route path={PATH.SIGN_UP} element={<SignUp />} />
              <Route path="ticket/:showtimesID" element={<TicketMovie />} />
              <Route path={PATH.HISTORY_TICKET} element={<HistoryTicket />} />
            </Route>

            <Route path={PATH.ADMIN} element={<AdminPage />}>
              <Route path="user" element={<UserPage />} />
              {/* <Route path="add-movie" element={<MoviePage />} /> */}
              <Route path="list-movie" element={<ListMovie />} />
              {/* <Route path="404" element={<NotFoundPage />} /> */}
            </Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
