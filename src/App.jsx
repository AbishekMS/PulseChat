import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import Contact from './components/Contact'
import Login from './authentications/Login'
import Register from './authentications/Register'
import ForgetPassword from './authentications/ForgetPassword'
import { UserProvider } from './authentications/UserContext'
function App() {
  
  return (
 
   <UserProvider>
   <Router>
   
   <Routes>
   <Route path='/' element={<Login/>}/>
   <Route path='/home' element={ <Home/>}/>
   <Route path='/contact' element={<Contact/>}/>
   <Route path='/register' element={<Register/>}/>
   <Route path='/forgot-password' element={<ForgetPassword/>}/>
   </Routes>
  
   </Router>
   </UserProvider>
   
  )
}

export default App;
