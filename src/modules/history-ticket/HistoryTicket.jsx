import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { infoUserAPI } from '../../apis/userAPI'

const HistoryTicket = () => {
  const { mutate: handleInfoUser, isPending } = useMutation({
    mutationFn: () => infoUserAPI(),
    onSuccess: (values) => {
      console.log('🚀  values:', values)
    },
    onError: (error) => {
      console.log('🚀  error:', error)
    },
  })

  return <div>History ticket</div>
}

export default HistoryTicket
