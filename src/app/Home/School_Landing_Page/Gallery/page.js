"use client"
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import Link from 'next/link';

const galleryImages = [
    { src: '/gallery/ai-generated-8659303_1280.jpg', name: 'Modern Classroom', description: 'Fully equipped digital classroom with smart boards.', path: '/gallery/classroom' },
    { src: '/gallery/ai-generated-8817237_1280.png', name: 'School Library', description: 'A vast collection of books and a quiet reading space.', path: '/gallery/library' },
    { src: '/gallery/living-room-8800183_1280.jpg', name: 'School Playground', description: 'A spacious playground with various sports facilities.', path: '/gallery/playground' },
    { src: '/gallery/ai-generated-9487507_1280.png', name: 'School Playground', description: 'A spacious playground with various sports facilities.', path: '/gallery/playground' },
    // { src: '/gallery/women-1178187_1280.jpg', name: 'Science Laboratory', description: 'Well-equipped science lab for practical learning.', path: '/gallery/laboratory' },
    // { src: '/gallery/silhouette-2512805_1280.jpg', name: 'Science Laboratory', description: 'Well-equipped science lab for practical learning.', path: '/gallery/laboratory' },
    // { src: '/gallery/sicily-4793099_1280.jpg', name: 'Science Laboratory', description: 'Well-equipped science lab for practical learning.', path: '/gallery/laboratory' },
];

const Gallery = () => {
    return (
        <section>
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md' id='gallery-section'>
                <div className="text-center">
                    <p className='text-primary text-lg font-normal mb-3 tracking-widest uppercase'>Our School Gallery</p>
                    <h2 className="text-3xl lg:text-5xl font-semibold text-black">
                    Explore Our School Campus
                    </h2>
                </div>
                <div className="my-16 px-6">
                    <Masonry
                        breakpointCols={{ 'default': 2, '700': 2, '500': 1 }}
                        className="flex gap-6"
                        columnClassName="masonry-column"
                    >
                        {/* Map through images */}
                        {galleryImages.map((item, index) => (
                            <div key={index} className="overflow-hidden rounded-3xl mb-6 relative group">
                                <Image
                                    src={item.src}
                                    alt={item.name}
                                    width={600}
                                    height={500}
                                    className="object-cover w-full h-full"
                                />
                                <div className="w-full h-full absolute bg-black/40 top-full group-hover:top-0 duration-500 p-12 flex flex-col items-start gap-4 justify-end">
                                    <p className='text-white text-2xl'>
                                     {item.name}
                                    </p>
                                    <p className='text-white text-lg'>{item.description}</p>
                                    <div className="flex items-center justify-between w-full">
                                        <Link href={item.path} className='text-white rounded-full bg-primary border border-primary py-2 px-6 hover:bg-primary/40 hover:backdrop-blur-sm'>
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </div>
            </div>
        </section>
    );
}

export default Gallery;