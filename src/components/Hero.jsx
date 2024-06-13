import React from 'react'
import heroImage from '../assets/women.jpg'

const Hero = () => {
  return (
    <div className="bg-white h-30  items-center">
      <div className="hero-content pt-14">
        <div className="text-container leading-relaxed">
        <h1 className='font-bold text-5xl mb-4'>
         Welcome to PulseChat </h1>
          <p>Manage and organize your contacts with ease</p>
          <button className="btn-primary">Get Started</button>
        </div>
        <div className="h-1/2 w-1/2">
          <img src={heroImage} alt="woman" />
        </div>
      </div>
    </div>
  )
}

export default Hero