 
import {Link} from "react-router-dom"
const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 space-y-6 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to VRV</h1>
        <p className="text-gray-600">Please login or sign up to continue.</p>
        <div className="flex justify-center space-x-4">
            <Link to={"/login"}>
          <button  className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Login
          </button>
            </Link>
            <Link to={"/signup"}>
          <button  className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
            Signup
          </button>
            </Link>
          
        </div>
      </div>
    </div>
  )
}

export default Home
