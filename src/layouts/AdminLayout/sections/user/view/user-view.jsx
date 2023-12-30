import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import Iconify from '../../../components/iconify'
import Scrollbar from '../../../components/scrollbar'

import TableNoData from '../table-no-data'
import UserTableRow from '../user-table-row'
import UserTableHead from '../user-table-head'
import TableEmptyRows from '../table-empty-rows'
import UserTableToolbar from '../user-table-toolbar'
import { emptyRows, applyFilter, getComparator } from '../utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getListUser, getListUserPagination } from '../../../../../apis/userAPI'
import ModalView from '../../modal/modal'
import AddUser from '../add-user'

// ----------------------------------------------------------------------

export default function UserPage() {
  const queryClient = useQueryClient()

  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('taiKhoan')

  const [filterName, setFilterName] = useState('')
  const [prevPage, setPrevPage] = useState(null)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [userRow, setUserRow] = useState([])
  console.log('userRow: ', userRow)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc'
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    }
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.taiKhoan)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, taiKhoan) => {
    const selectedIndex = selected.indexOf(taiKhoan)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, taiKhoan)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }
<<<<<<< HEAD
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
=======

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1)
    queryClient.invalidateQueries('get-user-pagination')
>>>>>>> 694eb7c6121b552b40a5539d516e7cd5e72903c6
  }

  const handleChangeRowsPerPage = async (event) => {
    setPage(0)
    setPrevPage(page)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-user-pagination', filterName, page, rowsPerPage],
    queryFn: () => getListUserPagination(filterName, page, rowsPerPage),
    enabled: !!rowsPerPage,
  })
  useEffect(() => {
    setUserRow(data?.items)
  }, [data])

  useEffect(
    (data) => {
      setUserRow(data?.items)
    },
    [page, rowsPerPage]
  )
  const { data: userList } = useQuery({
    queryKey: ['get-list-user'],
    queryFn: async () => await getListUser(),
  })

  const handleFilterByName = (event) => {
    setPage(0)
    setFilterName(event.target.value)
  }
  const dataUser = applyFilter({
    inputData: data?.items,
    comparator: getComparator(order, orderBy),
    filterName,
  })
  console.log('filterName: ', filterName)

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Users management</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataUser?.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'taiKhoan', label: 'Tài khoản' },
                  { id: 'hoTen', label: 'Họ tên' },
                  { id: 'email', label: 'Email' },
                  { id: 'soDT', label: 'Số điện thoại' },
                  { id: 'maLoaiNguoiDung', label: 'Loại người dùng' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataUser
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <UserTableRow
                      key={index}
                      taiKhoan={user.taiKhoan}
                      hoTen={user.hoTen}
                      email={user.email}
                      soDT={user.soDT}
                      matKhau={user.matKhau}
                      maLoaiNguoiDung={user.maLoaiNguoiDung}
                      selected={selected.indexOf(user.taiKhoan) !== -1}
                      handleClick={(event) => handleClick(event, user.taiKhoan)}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page || 0}
          component="div"
          count={userList?.length || 0}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 20, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <ModalView open={open} handleClose={handleClose}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thêm người dùng
        </Typography>
        <AddUser handleClose={handleClose} />
      </ModalView>
    </Container>
  )
}
