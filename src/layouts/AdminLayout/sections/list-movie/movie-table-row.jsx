import { useState } from 'react'
import PropTypes from 'prop-types'

import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Label from '../../components/label'
import Iconify from '../../components/iconify'
import { Box, Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMovieAPI } from '../../../../apis/movieAPI'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import ModalView from '../modal/modal'
import AddMovie from './add-movie/AddMovie'
import UpdateMovie from './update-movie/UpdateMovie'
import CreateTimeMovie from './create-time-movie'

// ----------------------------------------------------------------------

export default function MovieTableRow({
  selected,
  maPhim,
  hinhAnh,
  tenPhim,
  moTa,
  handleClick,
}) {
  const [selectedModal, setSelectedModal] = useState(null)

  const [openMenu, setOpenMenu] = useState(null)

  const queryClient = useQueryClient()

  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (modalType) => {
    setOpenModal(true)
    setSelectedModal(modalType)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedModal(null)
  }

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenu(null)
  }

  const { mutate: deleteMovie, isPending } = useMutation({
    mutationFn: (movieID) => {
      deleteMovieAPI(movieID)
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Xóa phim thành công',
        confirmButtonText: 'Đồng ý',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-movie')
        }
        return
      })
    },
    onError: (error) => {
      console.log('🚀  error:', error)
    },
  })

  const handleDeleteMovie = (maPhim) => {
    Swal.fire({
      icon: 'warning',
      title: 'Bạn có chắc chắn muốn xóa phim này?',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      denyButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovie(maPhim)
      }
      return
    })
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{maPhim}</TableCell>

        <TableCell>
          <Box sx={{ minWidth: '100%', minHeight: '100% ' }}>
            <img src={hinhAnh} alt={tenPhim} />
          </Box>
        </TableCell>

        <TableCell>{tenPhim}</TableCell>

        <TableCell>{moTa}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openMenu}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Button
            fullWidth
            onClick={() => {
              handleOpenModal('update')
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Sửa
          </Button>
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Button
            fullWidth
            onClick={() => {
              handleOpenModal('create')
            }}
          >
            <Iconify icon="eva:plus-outline" sx={{ mr: 2 }} />
            Tạo lịch chiếu
          </Button>
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Button
            sx={{ color: 'error.main' }}
            fullWidth
            onClick={() => {
              handleDeleteMovie(maPhim)
            }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Xóa
          </Button>
        </MenuItem>
      </Popover>

      <ModalView open={openModal} handleClose={handleCloseModal}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {selectedModal === 'update'
            ? 'Cập nhật phim upload hình'
            : `Tạo lịch chiếu cho phim: ${tenPhim}`}
        </Typography>
        {selectedModal === 'update' ? (
          <UpdateMovie maPhim={maPhim} handleClose={handleCloseModal} />
        ) : (
          <CreateTimeMovie handleClose={handleCloseModal} maPhim={maPhim} />
        )}
      </ModalView>
    </>
  )
}

MovieTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  maLoaiNguoiDung: PropTypes.any,
  matKhau: PropTypes.any,
  soDT: PropTypes.any,
  taiKhoan: PropTypes.any,
  hoTen: PropTypes.any,
  email: PropTypes.string,
}
