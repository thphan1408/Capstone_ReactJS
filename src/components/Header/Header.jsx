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

    <AppBar position="sticky" component="nav" color="inherit">
      <Container maxWidth="lg">
        <Box>
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Link
                to={PATH.HOME}
                style={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                }}
                size="medium"
              >
                Cyberpunk Cinema
              </Link>
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
                  Signup
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(PATH.SIGN_IN)}
                >
                  {' '}
                  Signin
                </Button>
              </Stack>
            )}
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
