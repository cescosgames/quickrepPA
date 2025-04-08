import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Input from './Input'
import Result from './Result'
import { AboutModal } from './AboutModal'
import { useAtom, useAtomValue } from 'jotai'
import { inLoadingState, isResult, isValidSearch } from '../atoms'

const Main = () => {
  const [showResult, setShowResult] = useAtom(isResult); // using our result atom to say if we should show result or question screen
  const [finalAddress, setFinalAddress] = useState();
  const [repName, setRepName] = useState();
  const [isLoading, setIsLoading] = useAtom(inLoadingState);
  const isValidZip = useAtomValue(isValidSearch);
  const [isModalOpen, setModalOpen] = useState(false);

  // function to see results
  // NOTE: this can be adapted to a public api that is able to link zip code -> representative
  // since google civics is shutting down, I have no alternative at the moment and am 'simulating' pulling from an api using a small data set in the public folder
  // you wuld also have to change the data returned to match the format of the API you are using
  async function seeResultsFunc(zipcode) {
    setIsLoading(true);

    try {
      // replace '/data.json' with the API url, see google example below
      const data = await fetchData('/data.json');

      // // google civics example (discontinued) below
      // const apiKey = import.meta.env.CIVICS_API_KEY; // Replace with real key inside .env file
      // const endpoint = `https://www.googleapis.com/civicinfo/v2/representatives`; // this is the old endpoint
      // const url = `${endpoint}?key=${apiKey}&address=${zipcode}`; // pass this URL to the fetchData function
      // // const googleExample = await fetchData(url); // see google civics documentation for data structure that is returned

      const match = data.find((item) => item.zipCode === zipcode);

      if (match) {
        setFinalAddress(returnFullAddress(match));
      } else {
        alert(`Sorry, I don't recognize this as a valid PA zip code!`)
        return;
      }
      
    } catch (error) {
      alert(`Error, please refresh and try again: ${error.message}`);
      return;
    }

    setIsLoading(false);
    // at the end, show the result
    setShowResult((prevState) => !prevState);
  }

  async function fetchData(url) {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Bad Response: ${response.status}`);
    }

    return await response.json();
  }

  const returnFullAddress = (data) => {
    const name = data.representative.name;
    const streetAddress = data.representative.contact.address;
    const city = data.representative.contact.city;
    const state = data.representative.contact.state;
    const zip = data.representative.contact.zip;

    const fullAddress = `${name} \n ${streetAddress} \n ${city}, ${state} ${zip}`;

    setRepName(name);

    return fullAddress;
  }



  // function to return to question
  const newSearch = () => {
    setShowResult((prevState) => !prevState);
  }

  return (
    // bg-gradient-to-b from-usa-white to-usa-blue // if we want gradient
    <div className='relative bg-usa-blue h-screen w-screen flex justify-center'>
        <Navbar />

        <AboutModal isOpen={isModalOpen} onClose={()=>setModalOpen(false)}> 
          {/* modal content */}
          <p className='leading-none'>
            This project was created as a rapid way to find the mailing address of your PA representative. 
            <br></br><br></br>
            I am currently looking for an alternative to Google Civic Information API to get this project online
            <br></br><br></br>
            For any questions, concerns, or constructive feedback, please feel free to contact me!
          </p>
        </AboutModal>

        {showResult ? 
            <Input seeResult={seeResultsFunc}/> 
          : 
            <Result newQuery={newSearch} headerText={`Step 2: Write a letter to Rep. ${repName} Using The Information Below!`} contactText={finalAddress}/>}
        
        <Footer openModal={()=>setModalOpen(true)}/>
    </div>
  )
}

export default Main