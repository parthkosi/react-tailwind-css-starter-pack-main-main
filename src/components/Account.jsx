import React from 'react'
import Sidebar from "./Sidebar";
import Navbar from './Navbar';

const Account = () => {
  return (
    <div>
      <Navbar/>
         <Sidebar/>
         <div className='fixed top-14 left-48 w-[calc(100%-12rem)] bg-yellow-500 shadow-md p-4 flex justify-between items-center z-10'>
             yhnioymunoykim
         </div>
 
     
    </div>
  )
}

export default Account
