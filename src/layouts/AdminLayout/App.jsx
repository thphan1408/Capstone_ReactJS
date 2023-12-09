import Router from './routes/sections'
import ThemeProvider from './theme'

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}
