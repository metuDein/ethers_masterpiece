import React from 'react'
import { Link } from 'react-router-dom'
import useDataContext from '../../hooks/useDataContext'


const AppFooter = () => {
    const { auth } = useDataContext()
    console.log(auth);

    return (
        <footer className='bg-black p-2 pt-1'>
            <section className='max-w-4xl mx-auto py-4 pt-1'>
                <div className='w-full border-b border-solid border-gray-500 p-1 mb-4'>
                    <Link to={'/'} className='flex'>
                        <img className='w-[40px] h-[40px]' src="assets/appmainlogo.png" alt="applogo" />
                        <div className=''>
                            <h2 className='font-bold text-xl text-white'>Ethers<br />
                            </h2>
                            <p className='-mt-2 text-white'>Masterpiece</p>
                        </div>
                    </Link>
                </div>
                <div className='w-full p-1 flex flex-col md:flex-row  items-center justify-between'>
                    <div className='flex flex-col self-start my-2 md:my-0'>
                        <h3 className='text-white font-medium text-xl '>App</h3>
                        <ul>

                            <li className='text-gray-400'>
                                <Link
                                    to={'/all-collections'}
                                >
                                    Our Collections
                                </Link>
                            </li>
                            <li className='text-gray-400'>
                                <Link
                                    to={'/all-itempage'}
                                >
                                    Our Assets
                                </Link>
                            </li>

                            <li className='text-gray-400'>
                                <Link to={'/my-profile'}>
                                    Profile
                                </Link>
                            </li>
                            {!auth?.user && <li className='text-gray-400'>
                                <Link
                                    to={'/user-authentication-login'}
                                >
                                    Login
                                </Link>
                            </li>}
                            {auth?.roles?.includes(5150) && <li className='text-gray-400'>
                                <Link
                                    to={'/admin-panel'}
                                >
                                    Admin panel
                                </Link>
                            </li>}
                        </ul>
                    </div>
                    <div className='flex flex-col self-start my-2 md:my-0'>
                        <h3 className='text-white font-medium text-xl'>Resources</h3>
                        <ul>
                            <li className='text-gray-400'>
                                <Link to={'/frequently-asked-questions'}>
                                    FAQs
                                </Link>
                            </li>
                            <li className='text-gray-400 my-2'>
                                <Link to={'/term-and-conditions'}>
                                    Terms and Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col self-start my-2 md:my-0'>
                        <h3 className='text-white font-medium text-xl'>Company</h3>
                        <ul>
                            <li className='text-gray-400 my-2'>
                                <Link
                                    to={'/support-center'}
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li className='text-gray-400 my-2'>
                                <Link
                                    to={'/about-us'}
                                >
                                    About Us
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
                <hr className='w-full bg-gray-600 my-3 text-gray-600' />
                <div>
                    <p className='text-gray-400'>Copyright © ETHERSMASTERPIECE, INC. {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </section>
        </footer>
    )
}

export default AppFooter