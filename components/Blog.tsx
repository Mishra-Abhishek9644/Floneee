import React from 'react'

const Blog = () => {
    return (
        <>
            <div className='md:pt-10'>
                <div className='flex justify-center items-center mb-14'>
                    <h2 className='flex items-center'> <hr className='w-20 border' /> <span className='px-5 text-3xl font-semibold'>OUR BLOG</span>  <hr className='w-20 border' /></h2>
                </div>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2  place-content-center md:px-32'>
                    <div>
                        <div>
                            <img src="https://flone.jamstacktemplates.dev/assets/img/blog/blog-1.jpg" alt="image" />
                        </div>
                        <div>
                            <h2>blog</h2>
                            <p>By Admin</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="https://flone.jamstacktemplates.dev/assets/img/blog/blog-2.jpg" alt="image" />
                        </div>
                        <div>
                            <h2>blog</h2>
                            <p>By Admin</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="https://flone.jamstacktemplates.dev/assets/img/blog/blog-3.jpg" alt="image" />
                        </div>
                        <div>
                            <h2>blog</h2>
                            <p>By Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog