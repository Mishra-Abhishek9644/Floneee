import Branding from '@/components/Branding'
import Breadcrumb from '@/components/Breadcrumb'
import { BriefcaseBusiness, CircleStar, CupSoda, Smile } from 'lucide-react'
import React, { ReactNode } from 'react'
import img1 from '../../assets/developer.png';

type StatProps = {
  icon: ReactNode;
  count: string;
  text: string;
};

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
                        <p className='md:w-200 w-full md:text-center text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labor et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo consequat irure</p>
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

                <div className="bg-[#f7f7f7] md:py-20 py-12 w-full overflow-hidden relative">
                    {/* fade edges */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-24  from-[#f7f7f7] to-transparent z-10" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-24  from-[#f7f7f7] to-transparent z-10" />

                    <div className="marquee flex gap-20 items-center hover:[animation-play-state:paused]">

                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-20 items-center">
                                <Stat
                                    icon={<BriefcaseBusiness size={46} />}
                                    count="15"
                                    text="Projects Done"
                                />
                                <Stat
                                    icon={<CupSoda size={46} />}
                                    count="350"
                                    text="Cups of Chai"
                                />
                                <Stat
                                    icon={<CircleStar size={46} />}
                                    count="2"
                                    text="Branding"
                                />
                                <Stat
                                    icon={<Smile size={46} />}
                                    count="1"
                                    text="Happy Client"
                                />
                            </div>
                        ))}

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
                            <div className='grid  md:grid-cols-2 grid-cols-1 gap-8'>
                                <div className='bg-[#f7f7f7]'>
                                    <img src={img1.src} className='' alt="image" />
                                    <div className='py-5'>
                                        <h1 className='text-xl font-bold '>Mishra Abhishek</h1>
                                        <p className='italic'>Web Developer</p>
                                    </div>
                                </div>

                                <div className='bg-[#f7f7f7]'>
                                    <img src={img1.src} className='' alt="image" />
                                    <div className='py-5'>
                                        <h1 className='text-xl font-bold '>Yadav Avanish</h1>
                                        <p className='italic'>Web Developer</p>
                                    </div>
                                </div>

</div>


                        </div>
                    </div>
                </div>

                <div className="overflow-hidden w-full md:pt-28 pt-10">
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

const Stat = ({ icon, count, text }:StatProps) => (
    <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition">
        <div className="text-gray-800">{icon}</div>
        <div>
            <h3 className="text-2xl font-semibold text-gray-900">{count}+</h3>
            <p className="text-sm text-gray-500 uppercase tracking-wide">{text}</p>
        </div>
    </div>
);

