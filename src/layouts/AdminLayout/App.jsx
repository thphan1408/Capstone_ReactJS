import Router from './routes/sections'
import ThemeProvider from '../../theme'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// ----------------------------------------------------------------------

export default function App() {
  return (
    // <Suspense>
    // <ThemeProvider>
    <Router />
    // </ThemeProvider>
    // </Suspense>
  )
}
