import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Stack,
  Container,
  Menu,
  Tooltip,
  Avatar,
  MenuItem,
} from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { PATH } from '../../routes/path'
import { useAuth } from '../../contexts/UserContext/UserContext'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const Header = () => {
  const navigate = useNavigate()
  const { currentUser, handleLogout } = useAuth()

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   {/* <AppBar position="static"> */}
    //   <Toolbar>
    //     <IconButton
    //       size="large"
    //       edge="start"
    //       color="inherit"
    //       aria-label="menu"
    //       sx={{ mr: 2 }}
    //     >
    //       <MenuIcon />
    //     </IconButton>
    //     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //       Link
    //     </Typography>
    //     {currentUser ? (
    //       <Stack direction={'row'} spacing={2} alignItems={'center'}>
    //         <Typography>{currentUser.hoTen}</Typography>

    //         <Button
    //           size="small"
    //           variant="contained"
    //           onClick={() => {
    //             handleLogout()
    //             navigate(PATH.SIGN_IN)
    //           }}
    //         >
    //           Đăng xuất
    //         </Button>
    //       </Stack>
    //     ) : (
    //       <Stack spacing={2} direction="row">
    //         <Button variant="outlined" onClick={() => navigate(PATH.SIGN_UP)}>
    //           Signup
    //         </Button>
    //         <Button variant="contained" onClick={() => navigate(PATH.SIGN_IN)}>
    //           {' '}
    //           Signin
    //         </Button>
    //       </Stack>
    //     )}
    //   </Toolbar>
    //   {/* </AppBar> */}
    // </Box>

    <AppBar position="sticky" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              mr: 'auto',
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              alignItems: 'center',
            }}
          >
            <Link to={PATH.HOME} className="text-3xl text-sky-600">
              Punk cinema
            </Link>
          </Box>

          {/* Responsive */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'justify',
                  }}
                >
                  <Link> Lịch chiếu phim</Link>
                  <Link> Cụm rạp</Link>
                  <Link> Về chúng tôi</Link>
                </Box>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link className="text-3xl" to={PATH.HOME}>
              Cyberpunk
            </Link>
          </Box>
          {/* End Responsive */}

          <Box
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            <Stack
              direction={'row'}
              spacing={4}
              sx={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'rgb(2, 132, 199)',
              }}
            >
              <Link> Lịch chiếu phim</Link>
              <Link> Cụm rạp</Link>
              <Link> Về chúng tôi</Link>
            </Stack>
          </Box>

          {currentUser ? (
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Typography>{currentUser.hoTen}</Typography>

              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  handleLogout()
                  navigate(PATH.SIGN_IN)
                }}
              >
                Đăng xuất
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={() => navigate(PATH.SIGN_UP)}>
                Đăng ký
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(PATH.SIGN_IN)}
              >
                Đăng nhập
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
