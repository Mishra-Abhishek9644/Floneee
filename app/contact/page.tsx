import Breadcrumb from '@/components/Breadcrumb'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <>
      <Breadcrumb />
      <div className='max-w-7xl mx-auto md:px-20 px-5 w-full md:py-20 py-5'>
        <div className='md:h-[70vh] h-[500px] border w-full'>
          <div className='h-full'>
            <iframe className='w-full h-full border-0' src="https://www.google.com/maps?q=Surat,India&output=embed"></iframe>
          </div>
        </div>

        <div className='w-full flex md:flex-row flex-col gap-4 my-5'>
          <div className='lg:w-[30%] md:w-[40%] w-full px-14 py-20 bg-[#f3f3f3] grid gap-4'>
            <div className='flex items-center gap-4'>
              <Phone className=' size-8 border p-2 rounded-full hover:bg-black hover:text-white' />
              <div>
                <p className='hover:text-purple-600'>
                  +012 345 678 102
                </p>
                <p className='hover:text-purple-600'>
                  +012 345 678 102
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <Mail className=' size-8 border p-2 rounded-full hover:bg-black hover:text-white' />
              <div>
                <p className='hover:text-purple-600'>
                  yourname@email.com
                </p>
                <p className='hover:text-purple-600'>
                  yourwebsitename.com
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <MapPin className=' size-8 border p-2 rounded-full hover:bg-black hover:text-white' />
              <div>
                <p className='hover:text-purple-600'>
                  Address goes here,
                </p>
                <p className='hover:text-purple-600'>
                  street, Crossroad 123.
                </p>
              </div>
            </div>

            <div className='grid place-content-center gap-4'>
              <div className='text-center text-xl font-semibold text-gray-600'>Follow Us</div>
              <p className='flex gap-4 flex-wrap'>
                <span><Facebook fill='' stroke='' /></span>
                <span><Twitter /></span>
                <span><Instagram /></span>
                <span><Twitter fill='' stroke='' /></span>
              </p>
            </div>

          </div>

          <div className='lg:w-[70%] md:w-[60%] w-full bg-[#f3f3f3] lg:px-28 md:px-10 px-5 md:py-10 py-5'>
            <div>
              <p className='text-2xl font-semibold text-gray-700 py-5'>Get In Touch</p>
              <form action="" method="post">
                <div className='grid grid-cols-1 gap-8 py-5 px-5 text-sm'>
                  <div className='grid md:grid-cols-2 grid-cols-1 gap-8'>
                    <input type="text" name="" placeholder='Name*' className='outline-hidden px-2 py-3 border border-gray-500' />
                    <input type="text" name="" placeholder='Email*' className='outline-hidden px-2 py-3 border border-gray-500' />
                  </div>
                  <div className='grid grid-cols-1 gap-8'>
                    <input type="text" name="" placeholder='Subject*' className='outline-hidden px-2 py-3 border w-full border-gray-500' />
                    <textarea name="" placeholder='Your Message*' className='h-40 w-full border border-gray-500 px-3 py-4 outline-hidden'></textarea>
                    <button className='uppercase bg-black/75 hover:bg-purple-600 text-white px-14 py-3 w-fit duration-700'>Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >

    </>
  )
}

export default page