import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <Breadcrumb />
      <div className=' flex justify-center items-center'>
        <div className='w-fit p-20 '>
          <div  className='text-center text-2xl font-bold text-purple-600 '>
          <span >Login</span> <Link href={`/register`} className='border-l text-black pl-2'>Register</Link>
          </div>
          <div className='shadow-xl border border-gray-300 p-20 my-10 rounded-md'>
            <div className='grid grid-cols-1 gap-4'>
              <input type="text" name="" className='py-2 w-md px-3 outline-hidden border border-gray-300' placeholder='Username' />
              <input type="text" name="" className='py-2 w-md px-3 outline-hidden border border-gray-300' placeholder='Password' />
            </div>
            <div className='flex justify-between items-center my-8 '>
              <div>
                <input type="checkbox" />&nbsp; Remember me
              </div>
              <a className='hover:text-purple-600 cursor-pointer'>Forgot Password</a>
            </div>
            <div>
              <button className='bg-gray-200 hover:bg-purple-600 hover:text-white px-8 py-2 uppercase text-sm duration-700'>Login</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default page