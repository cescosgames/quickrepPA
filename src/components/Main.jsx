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
      // fetch pa rep data from public folder
      const data = await fetchData('/reps.json');

      // find the first entry matching the user's zip code
      const match = data.find((item) => item.zipCode === zipcode);

      if (match) {
        // pull rep info and set state for the result screen
        const rep = match.representative;
        setRepName(rep.name);
        setFinalAddress(
          `${rep.name} (${rep.party})\nDistrict ${match.district}\nPhone: ${rep.phone}\n${rep.website}`
        );
      } else {
        // no match found, alert the user and bail out
        alert(`Sorry, I don't recognize this as a valid PA zip code!`);
        return;
      }

    } catch (error) {
      alert(`Error, please refresh and try again: ${error.message}`);
      return;
    }

    setIsLoading(false);
    setShowResult((prevState) => !prevState);
  }

  async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Bad Response: ${response.status}`);
    }

    return await response.json();
  }


  // function to return to question
  const newSearch = () => {
    setShowResult((prevState) => !prevState);
  }

  return (
    // bg-gradient-to-b from-usa-white to-usa-blue // if we want gradient
    <div className='relative bg-usa-blue h-screen w-screen flex justify-center'>
      <Navbar />

      <AboutModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {/* modal content */}
        <p className='leading-none'>
          This project was created as a rapid way to find the mailing address of your PA representative.
          <br></br><br></br>
          Representative Data was gathered using Claude Code based on 2025 public records. Please doublecheck information.
          {/* I am currently looking for an alternative to Google Civic Information API to get this project online */}
          <br></br><br></br>
          For any questions, concerns, or constructive feedback, please feel free to contact me!
        </p>
      </AboutModal>

      {showResult ?
        <Input seeResult={seeResultsFunc} />
        :
        <Result newQuery={newSearch} headerText={`Step 2: Write a letter to Rep. ${repName} Using The Information Below!`} contactText={finalAddress} />}

      <Footer openModal={() => setModalOpen(true)} />
    </div>
  )
}

export default Main