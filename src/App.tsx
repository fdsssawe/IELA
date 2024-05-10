import { useEffect, useState } from 'react'
import Header from './components/Header.tsx'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store/index.ts'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter.tsx'
import Footer from './components/Footer.tsx'



function App() {
  const dispatch = useDispatch();
  const isAuth : Boolean = useSelector((state : any) => state.prodAuth.isAuth)

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
