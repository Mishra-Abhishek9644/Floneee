import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-around items-center m-2 p-2'>
            <div className='text-4xl font-bold'>
                Flone.
            </div>
            <div className='flex gap-6 text-xl'>
                <Link href='/home'>Home</Link>
                <Link href='/shop'>Shop</Link>
                <Link href='/blog'>Blogs</Link>
                <Link href='/contact'>Contact Us</Link>
                
            </div>
            <div className='flex gap-2'>
                <Link href='/compare'>C</Link>
                <Link href='/wishlist'>Ws</Link>
                <Link href='/cart'>Cart</Link>
              
            </div>
    </div>
  )
}

export default Navbar