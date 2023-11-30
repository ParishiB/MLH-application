import React from 'react'

const Header = () => {
  return (
    <>
    <div className="h-[80px] bg-purple-400">
        <div className="grid grid-cols-3">
            <div className="text-white font-bold p-[25px]">VUEXY</div>
            <div className="text-black">
                <div className="p-[20px]">
                  <input type="search" placeholder="Search" className='p-[10px] w-80 rounded'/>
                </div>  
            </div>
            <div className=""></div>
        </div>
    </div>
    </>
  )
}

export default Header