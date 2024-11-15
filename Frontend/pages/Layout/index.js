import React from 'react'
import Navbar from '../Navbar/index';
import Footer from '../Footer/index'

const Layout=({children}) =>{
  return (
    <>
    <Navbar sx={{ zIndex: 10 }} />
    <div>{children}</div>
    <Footer/>
    </>
  )
}

export default Layout
