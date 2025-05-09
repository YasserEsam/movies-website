import { getDictionary } from '@/app/[lang]/dictionaries'
import CustomButton from '@/components/CustomButton'
import { BiRightArrow } from 'react-icons/bi'
import Image from 'next/image'

export default async function Hero({ lang }) {
  const dict = await getDictionary(lang)

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/netflex.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/50 to-black/90 dark:from-black/90 dark:via-purple-900/30 dark:to-black/95"></div>
      </div>

      <div className="mx-auto mt-12 md:mt-20 max-w-7xl px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="flex flex-col items-center justify-center">
          {/* Centered Content Container */}
          <div className="relative w-full max-w-2xl backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-xl md:rounded-2xl p-6 md:p-12 border border-white/20 dark:border-white/10 shadow-2xl transform perspective-1000 hover:rotate-y-2 transition-transform duration-500">
            {/* Contained Background Effects */}
            <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl">
              {/* Animated Gradient Orbs */}
              <div className="absolute top-1/4 left-1/4 w-32 md:w-48 h-32 md:h-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 dark:opacity-5 animate-blob"></div>
              <div className="absolute top-1/3 right-1/4 w-32 md:w-48 h-32 md:h-48 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-32 md:w-48 h-32 md:h-48 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-4000"></div>

              {/* Subtle Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] md:bg-[size:24px_24px]"></div>

              {/* Contained Animated Lines */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-slide-right"></div>
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-slide-down"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-slide-left"></div>
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-slide-up"></div>
              </div>

              {/* Glass Shine Effect */}
              <div className="absolute inset-0 glass-shine"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center">
              {/* Creative Tagline with 3D Effect */}
              <div className="relative group mb-4 md:mb-8 transform hover:scale-105 transition-transform duration-300 inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 w-full"></div>
                <span className="relative inline-block px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium tracking-wider text-purple-300 dark:text-purple-200 uppercase bg-white/10 dark:bg-black/20 rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20 border border-white/20 dark:border-white/10">
                  {dict.Hero.tagline}
                </span>
              </div>

              {/* Main heading with creative effects */}
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 md:mb-6">
                {dict.Hero.description.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className="relative inline-block transition-all duration-300 hover:scale-110 hover:text-purple-300 hover:translate-y-[-2px] hover:rotate-1"
                    style={{
                      transitionDelay: `${i * 50}ms`,
                      transform: `rotate(${Math.random() * 2 - 1}deg)`,
                    }}
                  >
                    {word}&nbsp;
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                ))}
              </h1>

              {/* Description with enhanced styling */}
              <p className="text-base md:text-lg leading-7 md:leading-8 text-gray-300 transition-all duration-300 hover:text-white mb-6 md:mb-8 glass-hover p-3 md:p-4 rounded-lg">
                {dict.Hero.details}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Bottom Border with Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse"></div>
      </div>
    </section>
  )
}
