import { useEffect} from 'react'
import Header from './components/Header.tsx'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store/index.ts'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter.tsx'
import Footer from './components/Footer.tsx'



function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(checkAuth() as any);
    }
  },[])

  return (
    <div className="dark:[color-scheme:dark] min-h-screen relative">
      <BrowserRouter>
      <Header/>
      <AppRouter/>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
