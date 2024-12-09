import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"

 

const App = () => {
  return (
    <div className='text-2xl'>
       


      <Routes>
        <Route path="/" element={<Home/>}    />
        <Route path="/login" element={<Login/>}    />
        <Route path="/signup" element={<Signup/>}    />
        <Route path="/dashboard" element={<Dashboard/>}    />
      </Routes>

    </div>
  )
}

export default App
