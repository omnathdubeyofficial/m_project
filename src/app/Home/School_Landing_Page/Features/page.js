"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from "react-icons/fa";

const FeaturesData = [
    {
        imgSrc: '/images/Features/featureOne.svg',
        heading: "Menu variations",
        subheading: "Sed ut perspiciatis unde omnis iste natus error",
      },
      {
        imgSrc: '/images/Features/featureTwo.svg',
        heading: "Cooking warw",
        subheading: "Sed ut perspiciatis unde omnis iste natus error",
      },
      {
        imgSrc: '/images/Features/featureThree.svg',
        heading: "Best chef",
        subheading: "Sed ut perspiciatis unde omnis iste natus error",
      },
      {
        imgSrc: '/images/Features/featureFour.svg',
        heading: "Fast food",
        subheading: "Sed ut perspiciatis unde omnis iste natus error",
      }
];

const Features = () => {
    return (
        <section>
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md' id="about-section">
                <div className='text-center mb-14' >
                    <p className='text-primary text-lg font-normal mb-3 tracking-widest uppercase'>Features</p>
                    <h2 className='text-3xl lg:text-5xl font-semibold text-black lg:max-w-60% mx-auto'>Get a many of interesting features.</h2>
                </div>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-32'>
                    {FeaturesData.map((items, i) => (
                        <div className='p-8 relative rounded-3xl bg-gradient-to-b from-black/5 to-white' key={i}>
                            <div className='work-img-bg rounded-full flex justify-center absolute -top-[50%] sm:top-[-40%] md:top-[-55%] lg:top-[-45%] left-[0%]'>
                                <Image src={items.imgSrc} alt={items.imgSrc} width={510} height={10} />
                            </div>
                            <h3 className='text-2xl text-black font-semibold text-center mt-16'>{items.heading}</h3>
                            <p className='text-lg font-normal text-black/50 text-center mt-2'>{items.subheading}</p>
                            <div className='flex items-center justify-center '>
                                <Link href='/' className='text-center text-lg group duration-300 ease-in-out font-medium text-primary mt-2 overflow-hidden flex items-center relative after:absolute after:w-full after:h-px after:bg-primary after:bottom-0 after:right-0 after:translate-x-full hover:after:translate-x-0'>
                                    Learn More
                                    <FaChevronRight
                                        width="24"
                                        height="24"
                                        className="text-primary "
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features;
