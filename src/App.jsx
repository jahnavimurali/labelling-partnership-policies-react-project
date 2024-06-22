import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GeoNamesAPI from './components/GeoNamesAPI'
import Manager from './components/Manager'

function App() {
  // sample input to test GeoNames API
  // const searchQuery = 'Tokyo';
  // const username = 'aathish2110240';
  return (
    <>
      <div>
      {/* <h1>GeoNames API Data</h1> */}
      {/* <GeoNamesAPI searchQuery={searchQuery} username={username} /> */}
      <Manager />
    </div>
    </>
  )
}

export default App
