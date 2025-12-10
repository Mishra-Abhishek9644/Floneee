import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
      <section className='flex justify-between items-center p-20'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Flone.</h2>
          <p>© 2025 Flone.</p>
          <p>All Rights Reserved</p>
        </div>
        <div className='flex flex-col'>
          <h3 className='text-gray-900 text-md '>ABUOT US</h3>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>About us</Link>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Store location</Link>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Contact</Link>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Orders Tracking</Link>
        </div>
        <div className='flex flex-col'>
          <h3 className='text-gray-900 text-md '>USEFULL LINKS</h3>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Returns</Link>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Support Policy</Link>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Size guie</Link>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>FAQs</Link>
        </div>
        <div className='flex flex-col'>
          <h3 className='text-gray-900 text-md '>FOLLOW US</h3>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Facebook</Link>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Twitter</Link>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Instagram</Link>
          <Link href="/about" className='text-gray-600 hover:text-purple-500'>Youtube</Link>
        </div>
        <div className='flex flex-col'>
          <h3 className='text-gray-900 text-md '>SUBSCRIBE</h3>
          <p>Get E-mail updates about our latest shop and special offers.</p>
          <input type='email' placeholder='Enter your email address...'  />
          <Link href="/subscribe" className='text-gray-600 hover:text-purple-500'>SUBSCRIBE</Link>
        </div>
        
      </section>
    </>
  )
}

export default Footer