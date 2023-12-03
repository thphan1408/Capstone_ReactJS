import { combineReducers } from 'redux'
import { MovieBookingReducer } from './slice'

export const rootReducer = combineReducers({
  MovieBooking: MovieBookingReducer,
})
