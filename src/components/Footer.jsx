import React from 'react'

const Footer = ({ openModal }) => {
    return (
        <footer className="bg-gray-800 text-white py-2 px-5 flex justify-center items-center fixed bottom-0 w-screen border-t-3 border-usa-red z-20">
            <div className='md:w-full w-sm flex justify-between items-center text-lg'>
                {/* left side */}
                <div className="flex items-center w-full justify-start">
                    <h1 className='cursor-default'>QuickRepPA</h1>
                </div>
                {/* center, hidden on small */}
                <div className='w-full justify-center items-center flex md:text-lg text-sm'>
                    <span className='flex gap-1'>
                        <p className='cursor-default hidden md:block'>A project</p>
                        <a href="https://github.com/cescosgames" target='_blank' className='hover:text-blue-400 transition'>by Cesco</a>
                        <p>|</p>
                        <p className='cursor-default hidden md:block'>Data</p>
                        {/* <a href="#" className='hover:text-blue-400 transition'>____ API</a> */}
                        <p>last updated 2025</p>
                    </span>
                </div>
                {/* right side */}
                <div className="flex space-x-4 w-full justify-end text-lg">
                    {/* <a href="#" className="hover:text-blue-400 transition">Home</a> */}
                    <button 
                        className="hover:text-blue-400 transition cursor-pointer"
                        onClick={openModal}
                    >
                        About

                    </button>
                    {/* <a href="#" className="hover:text-blue-400 transition">Contact</a> */}
                </div>
            </div>  
        </footer>
    );
}

export default Footer