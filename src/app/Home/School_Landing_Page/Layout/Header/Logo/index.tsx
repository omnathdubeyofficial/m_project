import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className='flex items-center text-black text-6xl font-semibold gap-4'>
      <Image
        src="/images/Logo/image.png"
        alt="logo"
        width={60}
        height={60}
        style={{ width: 'auto', height: 'auto' }}
        quality={100}
      />
     
    </Link>
  );
};

export default Logo;
