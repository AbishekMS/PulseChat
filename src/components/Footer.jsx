import React from 'react'

 const Footer = () => {
  return (
    <div className='header mt-10 relative'>
    <h1 className='absolute text-1xl left-1/2 transform -translate-x-1/2'>&copy; {new Date().getFullYear()}</h1>
  </div>
    )
}
export default Footer;
