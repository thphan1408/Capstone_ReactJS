import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'

const style = {
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  p: 2,
  position: 'absolute',
}

const ModalView = (props) => {
  const { open, handleClose, children } = props
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  const getModalStyle = () => {
    if (isMobile) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
      }
    } else if (isTablet) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
      }
    } else {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
      }
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...getModalStyle(), ...style }}>{children}</Box>
    </Modal>
  )
}

export default ModalView
