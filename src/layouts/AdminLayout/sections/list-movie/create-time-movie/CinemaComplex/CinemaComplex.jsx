import React from 'react'

import { MenuItem, TextField } from '@mui/material'

import { useQuery } from '@tanstack/react-query'

import { getInfoCinemaBySystem } from '../../../../../../apis/cinemaAPI'

const CinemaComplex = ({ maHeThongRap, onCinemaChange }) => {
  const { data: CinemaBySystem } = useQuery({
    queryKey: ['get-info-cinema-by-system', maHeThongRap],
    queryFn: () => getInfoCinemaBySystem(maHeThongRap),
  })

  const handleMenuItemClick = (value) => {
    if (onCinemaChange) {
      onCinemaChange(value)
    }
  }

  return (
    <>
      {CinemaBySystem?.map((cinema, index) => (
        <MenuItem
          key={cinema.maCumRap}
          value={cinema.maCumRap}
          onClick={() => handleMenuItemClick(cinema.maCumRap)}
        >
          {cinema.tenCumRap}
        </MenuItem>
      ))}
    </>
  )
}

export default CinemaComplex
