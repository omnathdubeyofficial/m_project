"use client"
import Image from 'next/image';

const AboutUs = () => {
    return (
        <section className='relative' id="AboutUs-section">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
                <div className='absolute right-0 bottom-[-18%] hidden lg:block'>
                    <Image src='/img/bus.png' alt="burger-image" width={463} height={622} />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5'>
                    <div className='col-span-6 flex justify-start'>
                        <Image src='/img/school.png' alt="nothing" width={636} height={808} />
                    </div>
                    <div className='col-span-6 flex flex-col justify-center'>
                        <p className='text-primary text-lg font-normal mb-3 tracking-widest uppercase text-start'>Vaekon School</p>
                        <h2 className="text-3xl lg:text-5xl font-semibold text-black text-start">
                        Excellence in Education, Innovation in Learning.
                        </h2>
                        <p className='text-black/50 md:text-lg font-normal  text-start mt-4'>Vaekon School, we are committed to taking education to new heights. With our modern teaching methods, experienced educators, and interactive learning environment, we empower students not just academically but also practically. </p>
                        <p className='text-black/50 md:text-lg font-normal mb-10 text-start mt-1'>Our goal is to help every student reach their full potential and become self-reliant. With quality education, smart classrooms, and personalized attention, we are dedicated to shaping a brighter future for children.</p>
                        <button className='text-xl font-medium rounded-full text-white py-5 px-6 bg-primary lg:px-10 mr-6 w-fit border border-primary hover:bg-transparent hover:text-primary'>Learn more</button>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default AboutUs;
