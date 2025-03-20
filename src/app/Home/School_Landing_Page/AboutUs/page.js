"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AboutUs = () => {
    const router = useRouter();

    return (
        <section className='relative' id="AboutUs-section">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
                {/* <div className='absolute right-0 bottom-[-18%] hidden lg:block'>
                    <Image src='/img/bus.png' alt="burger-image" width={463} height={622} />
                </div> */}
                <div className='grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5'>
                    <div className='col-span-6 flex justify-start'>
                        <Image src='/img/school.png' alt="nothing" width={636} height={808} />
                    </div>
                    <div className='col-span-6 flex flex-col justify-center'>
                        <p className='text-primary text-lg font-normal mb-3 tracking-widest uppercase text-start'>Student Results</p>
                        <h2 className="text-3xl lg:text-5xl font-semibold text-black text-start">
                            Excellence in Academic Performance
                        </h2>
                        <p className='text-black/50 md:text-lg font-normal text-start mt-4'>
                            Our students consistently achieve top results, showcasing their dedication and the effectiveness of our teaching methodologies. We celebrate their success in board exams and competitive assessments.
                        </p>
                        <p className='text-black/50 md:text-lg font-normal mb-4 text-start mt-1'>
                            With a focus on both academic and personal development, our students excel in various fields, proving their potential and readiness for future challenges.
                        </p>
                        <button 
                            onClick={() => router.push('/results')}
                            className='text-xl font-medium rounded-full text-white py-5 px-6 bg-primary lg:px-10  w-fit border border-primary hover:bg-transparent hover:text-primary'>
                            View Results
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs;
