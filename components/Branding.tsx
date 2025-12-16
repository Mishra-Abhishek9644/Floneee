import { BadgeDollarSign, BadgePercent, Clock7, TruckElectric } from 'lucide-react'
import React from 'react'

const Branding = () => {
    return (
        <>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-1 gap-4 place-content-center md:py-16 lg:px-24 md:px-16 px-10 mt-10'>
                <div className='flex justify-center items-center'>
                    <TruckElectric className='size-13 transition-all hover:animate-bounce duration-500' />
                    <div className='px-3'>
                        <h1 className='lg:font-normal md:font-medium sm:font-semibold'>Free Shipping</h1>
                        <p className='font-thin text-xs'>Free shipping on all order</p>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <Clock7 className='size-13 transition-all hover:animate-bounce duration-500' />
                    <div className='px-3'>
                        <h1 className='lg:font-normal md:font-medium sm:font-semibold'>Support 24/7</h1>
                        <p className='font-thin text-xs'>Free shipping on all order</p>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <BadgeDollarSign className='size-13 transition-all hover:animate-bounce duration-500' />
                    <div className='px-3'>
                        <h1 className='lg:font-normal md:font-medium sm:font-semibold'>Money Return</h1>
                        <p className='font-thin text-xs'>Free shipping on all order</p>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <BadgePercent className='size-13 transition-all hover:animate-bounce duration-500' />
                    <div className='px-3'>
                        <h1 className='lg:font-normal md:font-medium sm:font-semibold'>Order Discount</h1>
                        <p className='font-thin text-xs'>Free shipping on all order</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Branding