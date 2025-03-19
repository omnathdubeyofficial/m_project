import Image from 'next/image';
import { AcademicCapIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/solid';

const features = [
  {
    name: 'Modern Learning Environment',
    description:
      'Smart classrooms, digital learning tools, and an interactive curriculum for holistic development.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Safe & Secure Campus',
    description: '24/7 security, CCTV surveillance, and strict safety protocols for a secure learning space.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Expert Faculty & Guidance',
    description: 'Experienced mentors helping students excel academically and prepare for future challenges.',
    icon: UsersIcon,
  },
];

export default function VaekonSchoolWorkflow() {
  return (
    <div className="bg-gray-50 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h2 className="text-lg font-semibold text-blue-600">Empowering Future Leaders</h2>
            <p className="mt-4 text-4xl font-semibold text-gray-900 sm:text-5xl">Vaekon School - Excellence in Education</p>
            <p className="mt-6 text-lg font-semibold text-gray-600">
              We nurture young minds with a blend of traditional values and modern education, offering a structured curriculum and world-class facilities.
            </p>
            <div className="mt-10 space-y-6">
              {features.map((feature) => (
                <div key={feature.name} className="flex items-start space-x-4">
                  <feature.icon className="size-10 text-blue-600" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                    <p className="text-gray-600 font-semibold">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Image
              alt="Vaekon School Campus"
              src="/img/students.jpg"
              width={800}
              height={500}
              className="rounded-3xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent opacity-30 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
