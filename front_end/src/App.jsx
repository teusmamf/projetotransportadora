import { useState } from 'react'
import './App.css'
import CalculationPage from './pages/create_report_freight'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CalculationPage/>
    </>
  )
}

export default App
