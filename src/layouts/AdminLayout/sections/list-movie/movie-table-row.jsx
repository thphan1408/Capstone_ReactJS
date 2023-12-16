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
import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMovieAPI } from '../../../../apis/movieAPI'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

// ----------------------------------------------------------------------

export default function MovieTableRow({
  selected,
  maPhim,
  hinhAnh,
  tenPhim,
  moTa,
  handleClick,
}) {
  const [open, setOpen] = useState(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
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
          // navigate('/admin/list-movie')
          window.location.reload()
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

        <TableCell width={100}>{maPhim}</TableCell>

        <TableCell>
          <img
            src={hinhAnh}
            alt={tenPhim}
            style={{ width: 550, height: 100 }}
          />
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
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Button fullWidth>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
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
            Delete
          </Button>
        </MenuItem>
      </Popover>
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
