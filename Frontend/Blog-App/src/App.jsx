import './App.css'
import Intro from './Components/Intro'
import Nav from './Components/Home/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Register/Login'
import SignUp from './Components/Register/Signup'
import Post from './Components/Home/Post'


function App() {

  return (
    <div>
      {/* <Intro /> */}
      {/* {location.pathname !== '/' && <Header />} */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Intro />}></Route>
          <Route
            path='/home'
            element={
              <>
                <Nav />
                <Post />
              </>
            }
          />
          <Route path='/about' element={<h1>Hi</h1>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
