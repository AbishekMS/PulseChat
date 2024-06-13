import React from 'react'
import AddContact from './AddContact'
import Hero from './Hero'
import Contacts from './Contacts'
import Header from './Header'
import Footer from './Footer'


export const Home = () => {
  return (
    <div>
  <Header/>
    <Hero/>
    <div className="flex justify-between flex-col mx-44">
    <AddContact/> <Contacts/> </div>
   <Footer/>
    </div>
  )
}
