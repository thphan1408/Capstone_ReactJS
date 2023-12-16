import { useState } from 'react'
import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material'
import React from 'react'
import Scrollbar from '../../../components/scrollbar'
import { useQuery } from '@tanstack/react-query'
import Iconify from '../../../components/iconify'

import MovieTableHead from '../movie-table-head'
import MovieTableToolbar from '../movie-table-toolbar'
import { getListMovieAPI } from '../../../../../apis/movieAPI'
import { applyFilter, getComparator, emptyRows } from '../utils'
import MovieTableRow from '../movie-table-row'
import ModalView from '../../modal/modal'
import AddMovie from '../add-movie/AddMovie'

const ListMovieView = () => {
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('tenPhim')

  const [filterName, setFilterName] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    data: ListMovie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['get-list-movie'],
    queryFn: getListMovieAPI,
  })

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc'
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    }
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ListMovie.map((n) => n.maPhim)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, maPhim) => {
    const selectedIndex = selected.indexOf(maPhim)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, maPhim)
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = (event) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const dataMovie = applyFilter({
    inputData: ListMovie,
    comparator: getComparator(order, orderBy),
    filterName,
  })

  const notFound = !ListMovie?.length && !!filterName

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Movie management</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New movie
          </Button>
        </Stack>

        <Card>
          <MovieTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <MovieTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={ListMovie?.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'maPhim', label: 'Mã phim' },
                    { id: 'hinhAnh', label: 'Hình ảnh' },
                    { id: 'tenPhim', label: 'Tên phim' },
                    { id: 'moTa', label: 'Mô tả' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataMovie?.map((movie, index) => (
                    <MovieTableRow
                      key={index}
                      maPhim={movie.maPhim}
                      hinhAnh={movie.hinhAnh}
                      tenPhim={movie.tenPhim}
                      moTa={movie.moTa}
                      selected={selected.indexOf(movie.maPhim) !== -1}
                      handleClick={(event) => handleClick(event, user.tenPhim)}
                    />
                  ))}

                  {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, ListMovie?.length)}
                />

                {notFound && <TableNoData query={filterName} />} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={ListMovie?.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <ModalView open={open} handleClose={handleClose}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thêm phim upload hình
        </Typography>
        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
        </Scrollbar> */}
        <AddMovie handleClose={handleClose} />
      </ModalView>
    </>
  )
}

export default ListMovieView
