import Image from 'next/image';
import { AcademicCapIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/solid';

const features = [
  {
    name: 'Modern Learning Environment',
    description:
      'Vaekon School provides smart classrooms, digital learning tools, and an interactive curriculum for holistic development.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Safe & Secure Campus',
    description: 'With 24/7 security, CCTV surveillance, and strict safety protocols, we ensure a safe environment for every student.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Expert Faculty & Guidance',
    description: 'Our experienced teachers and mentors help students excel academically and prepare for future challenges.',
    icon: UsersIcon,
  },
];

export default function VaekonSchoolWorkflow() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-blue-600">Empowering Future Leaders</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Vaekon School - Excellence in Education
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Vaekon School, we believe in nurturing young minds with a blend of traditional values and modern education. Our well-structured curriculum and world-class facilities help students reach their full potential.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-12">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-0 left-0 size-8 text-blue-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            alt="Vaekon School Campus"
            src="/img/students.jpg"
            width={800}
            height={500}
            className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
