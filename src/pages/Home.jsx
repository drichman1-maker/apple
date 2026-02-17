import React from 'react'
import Hero from '../components/Home/Hero'
import FeaturedProducts from '../components/Home/FeaturedProducts'
import Features from '../components/Home/Features'
import HowItWorks from '../components/Home/HowItWorks'
import Newsletter from '../components/Home/Newsletter'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Features />
      <HowItWorks />
      <Newsletter />
    </div>
  )
}

export default Home