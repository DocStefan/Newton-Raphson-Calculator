import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import LandPage from './components/LandPage'

function App() {

  return (
    
    <BrowserRouter>
     <Routes>
       <Route path="/" element={[<LandPage />]} />
     </Routes>
    </BrowserRouter>

  )
}

export default App