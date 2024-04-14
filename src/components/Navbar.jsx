import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-blue-700 justify-between py-2 text-white'>
      <div className="logo mx-8 font-bold text-xl">iTask</div>
      <ul className="flex list-none mx-9 gap-8">
        <li className=' hover:font-bold cursor-pointer transition-all'>Home</li>
        <li className=' hover:font-bold cursor-pointer transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
