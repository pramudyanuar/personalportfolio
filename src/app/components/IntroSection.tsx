'use client';

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export default function IntroSection() {
  return (
    <header className="relative flex flex-col justify-center items-center text-center min-h-screen px-4 md:px-6 overflow-hidden z-[2]">
      
      {/* Container untuk beberapa lintasan orbit acak */}
      <div className="orbital-container">
        {/* Setiap 'orbit-path' akan memiliki lintasan dan dot sendiri */}
        <div className="orbit-path path-1"></div>
        <div className="orbit-path path-2"></div>
        <div className="orbit-path path-3"></div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* ... sisa konten Anda tetap sama ... */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Hello, I&apos;m Pramudyanuar.
        </h1>
        <div className="text-base md:text-lg lg:text-xl text-text-secondary px-2 h-14 md:h-8 leading-relaxed mt-4">
          <TypeAnimation
            sequence={[
              'Engineering sleek web interfaces with modern stacks.', 2000,
              'Optimizing mobile UX with Flutter & React Native.', 2000,
              'Building scalable APIs and backend systems.', 2000,
              'Deploying apps with CI/CD and cloud services.', 2000,
              'Shipping code that feels fast, clean, and smart.', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        <div className="flex justify-center gap-x-6 mt-16 lg:mt-28">
          <a 
            href="https://github.com/pramudyanuar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl text-text-secondary hover:text-white transition duration-300 hover:scale-110"
          >
            <FaGithub />
          </a>
          <a 
            href="https://linkedin.com/in/pramudyanuar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl text-text-secondary hover:text-white transition duration-300 hover:scale-110"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 text-sm sm:text-base text-text-secondary animate-bounce">
        ↓ Scroll to explore my work ↓
      </div>
    </header>
  );
}