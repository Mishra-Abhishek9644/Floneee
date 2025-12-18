import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
      <section className='bg-[#f6f6f8] lg:grid-cols-5 md:grid-cols-3 grid md:place-content-center lg:items-center lg:px-44 md:px-16 md:py-24 px-3 py-10'>
        <div className='pb-5'>
          <h2 className='text-4xl font-bold text-gray-800'>Flone.</h2>
          <p className='text-gray-500'>© 2025 <span className='hover:text-purple-600 cursor-pointer font-medium '>Flone</span>. <br />
          All Rights Reserved</p>
        </div>
        <div className='flex flex-col leading-8 pb-5'>
          <h3 className='text-gray-900 text-md'>ABUOT US</h3>
          <Link href="/about" className='text-gray-500 hover:text-purple-500 cursor-pointer'>About us</Link>
          <Link href="/contact" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Store location</Link>
          <Link href="/contact" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Contact</Link>
          <Link href="/shop" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Orders Tracking</Link>
        </div>
        <div className='flex flex-col leading-8 pb-5'>
          <h3 className='text-gray-900 text-md'>USEFULL LINKS</h3>
          <Link href="/shop" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Returns</Link>
          <Link href="/contact" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Support Policy</Link>
          <Link href="/shop" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Size guie</Link>
          <Link href="/contact" className='text-gray-500 hover:text-purple-500 cursor-pointer'>FAQs</Link>
        </div>
        <div className='flex flex-col leading-8 pb-5'>
          <h3 className='text-gray-900 text-md'>FOLLOW US</h3>
          <Link href="/" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Facebook</Link>
          <Link href="/" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Twitter</Link>
          <Link href="/" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Instagram</Link>
          <Link href="/" className='text-gray-500 hover:text-purple-500 cursor-pointer'>Youtube</Link>
        </div>
        <div className='flex flex-col leading-8 pb-5'>
          <h3 className='text-gray-900 text-md'>SUBSCRIBE</h3>
          <p className='leading-6 text-gray-500 text-sm lg:w-[250px]'>Get E-mail updates about our latest shop and special offers.</p>
          <input type='text' placeholder='Enter your email address...' className='mt-4 text-sm p-2 focus:outline-hidden'  />
          <hr className='border border-gray-200 my-2' />
          <Link href="/login" className='text-gray-500 hover:text-purple-500 text-sm border-b border-gray-500 w-fit cursor-pointer'>SUBSCRIBE</Link>
        </div>
        
      </section>
    </>
  )
}

export default Footer