import React from 'react'

const Blog = () => {
    return (
        <>
            <div className='mt-16 mb-32'>
                <div className='flex justify-center items-center mb-14'>
                    <h2 className='flex items-center'> <hr className='w-20 border' /> <span className='px-5 text-3xl font-semibold'>OUR BLOG</span>  <hr className='w-20 border' /></h2>
                </div>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2  place-content-center md:px-32'>
                    <div className='relative flex justify-center my-10'>
                        <div className='overflow-hidden w-fit'>
                            <img src="https://flone.jamstacktemplates.dev/assets/img/blog/blog-1.jpg" className='scale-100 transition-all duration-500 object-cover hover:scale-125' alt="image" />
                        </div>
                        <div className='text-center bg-white absolute -bottom-14 px-14 left-1/2 -translate-x-2/4  py-5 w-[300px]'>
                            <h2 className='text-xl font-medium'>A guide to latest trends</h2>
                            <p className='italic text-gray-500 text-sm'>By Admin</p>
                        </div>
                    </div>
                    <div className='relative flex justify-center my-10'>
                        <div className='overflow-hidden w-fit'>
                            <img src="https://flone.jamstacktemplates.dev/assets/img/blog/blog-2.jpg" className='scale-100 transition-all duration-500 object-cover hover:scale-125' alt="image" />
                        </div>
                        <div className='text-center bg-white absolute -bottom-14 px-14 left-1/2 -translate-x-2/4  py-5 w-[300px]'>
                            <h2 className='text-xl font-medium'>Five ways to lead a happy life</h2>
                            <p className='italic text-gray-500 text-sm'>By Admin</p>
                        </div>
                    </div>
                    <div className='relative flex justify-center my-10'>
                        <div className='overflow-hidden w-fit'>
                            <img src="https://flone.jamstacktemplates.dev/assets/img/blog/blog-3.jpg" className='scale-100 transition-all duration-500 object-cover hover:scale-125' alt="image" />
                        </div>
                        <div className='text-center bg-white absolute -bottom-14 px-14 left-1/2 -translate-x-2/4  py-5 w-[300px]'>
                            <h2 className='text-xl font-medium'>Tips on having a happy life</h2>
                            <p className='italic text-gray-500 text-sm'>By Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog