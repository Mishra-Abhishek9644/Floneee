import Branding from '@/components/Branding'
import Breadcrumb from '@/components/Breadcrumb'
import { BriefcaseBusiness, CircleStar, CupSoda, Smile } from 'lucide-react'
import React from 'react'

const page = () => {

    return (
        <>
            <Breadcrumb />
            <div className=' py-10 md:py-20'>
                <div className='md:px-36 px-5 flex justify-center items-center'>
                    <div className='text-center '>
                        <p>Who Are We</p>
                        <h3 className=' text-3xl font-medium'>Welcome To Flone</h3>
                        <div className='flex justify-center items-center'>
                            <hr className='w-20 border-2 mt-5' />
                        </div>
                        <p className='md:w-[800px] w-full md:text-center text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labor et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo consequat irure</p>
                    </div>
                </div>

                <div className='py-20 md:px-36 px-5'>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-8'>
                        <div className=''>
                            <div className='overflow-hidden'>
                                <img className='h-55 w-full scale-100 hover:scale-125 duration-500' src="https://flone.jamstacktemplates.dev/assets/img/banner/banner-1.jpg" alt="image1" />
                            </div>
                            <div className='py-20'>
                                <h3 className='text-2xl font-medium my-5'>Our Vision</h3>
                                <p className='text-sm text-justify'>Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.</p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='overflow-hidden'>
                                <img className='h-55 w-full scale-100 hover:scale-125 duration-500' src="https://flone.jamstacktemplates.dev/assets/img/banner/banner-2.jpg" alt="image1" />
                            </div>
                            <div className='py-20'>
                                <h3 className='text-2xl font-medium my-5'>Our Mission</h3>
                                <p className='text-sm text-justify'>Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.</p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='overflow-hidden'>
                                <img className='h-55 w-full scale-100 hover:scale-125 duration-500' src="https://flone.jamstacktemplates.dev/assets/img/banner/banner-3.jpg" alt="image1" />
                            </div>
                            <div className='py-20'>
                                <h3 className='text-2xl font-medium my-5'>Our Goal</h3>
                                <p className='text-sm text-justify'>Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#f7f7f7] md:py-20 py-10 w-full overflow-hidden">
                    <div className="marquee flex gap-16 items-center">

                        {/* FIRST SET */}
                        <div className="flex gap-16 items-center">
                            <Stat icon={<BriefcaseBusiness size={50} />} count="15" text="project done" />
                            <Stat icon={<CupSoda size={50} />} count="350" text="cups of chai" />
                            <Stat icon={<CircleStar size={50} />} count="2" text="branding" />
                            <Stat icon={<Smile size={50} />} count="1" text="happy client" />
                        </div>

                        {/* DUPLICATE SET (for infinite loop) */}
                        <div className="flex gap-16 items-center">
                            <Stat icon={<BriefcaseBusiness size={50} />} count="15" text="project done" />
                            <Stat icon={<CupSoda size={50} />} count="350" text="cups of chai" />
                            <Stat icon={<CircleStar size={50} />} count="2" text="branding" />
                            <Stat icon={<Smile size={50} />} count="1" text="happy client" />
                        </div>
                        
                        {/* DUPLICATE SET (for infinite loop) */}
                        <div className="flex gap-16 items-center">
                            <Stat icon={<BriefcaseBusiness size={50} />} count="15" text="project done" />
                            <Stat icon={<CupSoda size={50} />} count="350" text="cups of chai" />
                            <Stat icon={<CircleStar size={50} />} count="2" text="branding" />
                            <Stat icon={<Smile size={50} />} count="1" text="happy client" />
                        </div>

                    </div>
                </div>


                <div className='pt-20 md:px-36 px-5 flex justify-center items-center'>
                    <div className='text-center '>
                        <h3 className=' text-3xl font-bold'>Team Members</h3>
                        <div className='flex justify-center items-center'>
                            <hr className='w-20 border my-4' />
                        </div>
                        <p className='text-sm'>Lorem ipsum dolor sit amet conse ctetu.</p>

                        <div className='md:mt-20 mt-5'>
                            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8'>
                                <div className='bg-[#f7f7f7]'>
                                    <img src="https://flone.jamstacktemplates.dev/assets/img/team/team-1.jpg" className='' alt="image" />
                                    <div className='py-5'>
                                        <h1 className='text-xl font-bold '>Mishra Abhishek</h1>
                                        <p className='italic'>Web Developer</p>
                                    </div>
                                </div>

                                <div className='bg-[#f7f7f7]'>
                                    <img src="https://flone.jamstacktemplates.dev/assets/img/team/team-1.jpg" className='' alt="image" />
                                    <div className='py-5'>
                                        <h1 className='text-xl font-bold '>Yadav Avanish</h1>
                                        <p className='italic'>Web Developer</p>
                                    </div>
                                </div>

                                <div className='bg-[#f7f7f7]'>
                                    <img src="https://flone.jamstacktemplates.dev/assets/img/team/team-1.jpg" className='' alt="image" />
                                    <div className='py-5'>
                                        <h1 className='text-xl font-bold '>Mishra Abhishek</h1>
                                        <p className='italic'>Web Developer</p>
                                    </div>
                                </div>
                                
                                <div className='bg-[#f7f7f7]'>
                                    <img src="https://flone.jamstacktemplates.dev/assets/img/team/team-1.jpg" className='' alt="image" />
                                    <div className='py-5'>
                                        <h1 className='text-xl font-bold '>Yadav Avanish</h1>
                                        <p className='italic'>Web Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden w-full md:py-28 py-10">
                    <div className="marquee gap-40 cursor-grabbing">
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-5.png" alt="" />
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-1.png" alt="" />
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-2.png" alt="" />
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png" alt="" />
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-4.png" alt="" />
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-5.png" alt="" />
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-1.png" alt="" />
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-2.png" alt="" />
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png" alt="" />
                        <img src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-4.png" alt="" />
                    </div>
                </div>


            </div>
        </>
    )
}

export default page

const Stat = ({ icon, count, text }: any) => (
  <div className="flex flex-col items-center min-w-[200px]">
    {icon}
    <p className="text-4xl py-5 text-purple-600 font-bold">{count}</p>
    <h3 className="text-2xl capitalize">{text}</h3>
  </div>
);
