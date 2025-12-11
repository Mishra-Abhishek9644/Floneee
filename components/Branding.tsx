import { BadgeDollarSign, BadgePercent, Clock7, TruckElectric } from 'lucide-react'
import React from 'react'

const Branding = () => {
    return (
        <>
            <div className='flex justify-evenly items-center md:py-16 md:px-24'>
                <div className='flex justify-center items-center'>
                    <TruckElectric className='size-13 transition-all hover:animate-bounce duration-500' />
                    <div className='px-3'>
                        <h1>Free Shipping</h1>
                        <p>Free shipping on all order</p>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <Clock7 className='size-13 transition-all hover:animate-bounce duration-500' />
                    <div className='px-3'>
                        <h1>Support 24/7</h1>
                        <p>Free shipping on all order</p>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <BadgeDollarSign className='size-13 transition-all hover:animate-bounce duration-500' />
                    <div className='px-3'>
                        <h1>Money Return</h1>
                        <p>Free shipping on all order</p>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <BadgePercent className='size-13 transition-all hover:animate-bounce duration-500' />
                    <div className='px-3'>
                        <h1>Order Discount</h1>
                        <p>Free shipping on all order</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Branding