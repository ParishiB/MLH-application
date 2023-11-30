import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
    <div className='h-full p-[20px] text-slate-700'>
        <h1 className='p-[15px]'>Dashboards</h1>
        <h1 className='p-[15px]'>Front Pages</h1>

        <h2 className='p-[15px] font-thin'>APPS & PAGES</h2>
        <h1 className='p-[15px]' >Ecommerce</h1>
        <h1 className='p-[15px]' >Academy</h1>
        <h1 className='p-[15px]' >Logistics</h1>
        <h1 className='p-[15px]' >Email</h1>
        <div className="p-[25px]">
        <button className="bg-purple-600 p-[10px] rounded font-bold text-white"><Link to='/signup'>LOGOUT</Link></button>
        </div>
    </div> 
    </>
  )
}

export default Sidebar