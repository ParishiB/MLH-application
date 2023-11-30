import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Main from '../components/Main'


const Home = () => {
  return (
    <>
     <Header/>
      <div className="grid grid-cols-[20%_auto]">
      <Sidebar/>
      <Main/>
      </div>
     <Footer/>
    </>
  )
}

export default Home