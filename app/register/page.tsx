import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <Breadcrumb />
      <div className=' flex justify-center items-center'>
        <div className='w-fit p-20 '>
          <div className='text-center text-2xl font-bold '>
            <Link href={`/login`} >Login </Link> <span className='border-l text-purple-600 pl-2'>Register</span>
          </div>
          <div className='shadow-xl border border-gray-300 p-20 my-10 rounded-md'>
            <div className='grid grid-cols-1 gap-4'>
              <input type="text" name="" className='py-2 w-md px-3 outline-hidden border border-gray-300' placeholder='Username' />
              <input type="text" name="" className='py-2 w-md px-3 outline-hidden border border-gray-300' placeholder='Password' />
              <input type="text" name="" className='py-2 w-md px-3 outline-hidden border border-gray-300' placeholder='Email' />
            </div>
            <div className='mt-10'>
              <button className='bg-gray-200 hover:bg-purple-600 hover:text-white px-8 py-2 uppercase text-sm duration-700'>Register</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default page