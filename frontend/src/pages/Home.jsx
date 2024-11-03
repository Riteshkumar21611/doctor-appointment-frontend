import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctorsCard from '../components/TopDoctorsCard'
import Banner from '../components/Banner'

export const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctorsCard />
      <Banner />
    </div>
  )
}
