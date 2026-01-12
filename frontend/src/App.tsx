import React,{lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PageLoader from './components/PageLoader'
const Vendors = lazy(()=>import('./pages/Vendors'))
const NotFound = lazy(()=>import('./pages/NotFound'))

const App = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<PageLoader/>}>
    <Routes>
    <Route index path='/' element={<Vendors/>}/>
    <Route path='*' element={<NotFound/>}/>
    </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default App