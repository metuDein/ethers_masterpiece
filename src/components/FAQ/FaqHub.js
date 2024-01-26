import React from 'react'
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

const FaqHub = () => {
    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6 text-black dark:text-white'>
            <section className='max-w-4xl w-full mx-auto'>
                <div className='w-full mb-12'>
                    <h1 className='text-center text-2xl md:text-4xl'>Frequently Asked Questions</h1>
                    <form className='mx-auto flex items-center justify-center space-x-1 max-w-[300px] my-8 shadow-2xl'>
                        <input type="text" placeholder='find a topic' className='w-full p-2 text-[16px] basis-3/4 h-10 rounded-l-md focus:outline-none border border-gray-500 text-black' />
                        <button className='basis-1/4 bg-black h-10 group transition-all duration-300 rounded-e-md'><FaSearch className='inline text-xl group-hover:text-2xl' /></button>
                    </form>
                </div>
                {/* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 */}
                <h2 className='text-3xl text-center'>Quick answers.</h2>
                <div className="w-full flex flex-wrap flex-row flex-auto items-center justify-center gap-3 min-h-[50vh] my-12  p-2">
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 hover:transform hover:scale-110 transition-all duration-300 ease-in-out '>
                        <Link
                            to={'/how-to-connect-wallet'}
                            className='w-full flex flex-col space-y-3 p-2'>
                            <img className='w-[150px] h-[150px] mx-auto' src="assets/connectwallet.png" alt="faqlogo" />
                            <h3 className='text-center font-bold text-black'>Wallet Intergration</h3>
                        </Link>
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 hover:transform hover:scale-110 transition-all duration-300 ease-in-out'>
                        <Link
                            to={'/how-to-create-a-collection'}
                            className='w-full flex flex-col space-y-3'>
                            <img className='w-[150px] h-[150px] mx-auto' src="assets/createcollection.png" alt="faqlogo" />
                            <h3 className='text-center font-bold text-black'>Create a Collection</h3>
                        </Link>
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 hover:transform hover:scale-110 transition-all duration-300 ease-in-out'>
                        <Link
                            to={'/how-to-create-an-NFT'}
                            className='w-full flex flex-col space-y-3'>
                            <img className='w-[150px] h-[150px] mx-auto' src="assets/createnft.png" alt="faqlogo" />
                            <h3 className='text-center font-bold text-black'>Create an Asset </h3>
                        </Link>
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 hover:transform hover:scale-110 transition-all duration-300 ease-in-out'>
                        <Link
                            to={'/what-is-an-NFT'}
                            className='w-full flex flex-col space-y-3'>
                            <img className='w-[150px] h-[150px] mx-auto' src="assets/nft.png" alt="faqlogo" />
                            <h3 className='text-center font-bold text-black'>What is an NFTs </h3>
                        </Link>
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 hover:transform hover:scale-110 transition-all duration-300 ease-in-out'>
                        <Link
                            to={'/How-to-buy-an-asset'}
                            className='w-full flex flex-col space-y-3'>
                            <img className='w-[150px] h-[150px] mx-auto' src="assets/buyingnft.png" alt="faqlogo" />
                            <h3 className='text-center font-bold text-black'>Buying an asset </h3>
                        </Link>
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 hover:transform hover:scale-110 transition-all duration-300 ease-in-out'>
                        <Link to={'/term-and-conditions'}
                            className='w-full flex flex-col space-y-3'>
                            <img className='w-[150px] h-[150px] mx-auto' src="assets/t&c.png" alt="faqlogo" />
                            <h3 className='text-center font-bold text-black'>Terms and conditions </h3>
                        </Link>
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 hover:transform hover:scale-110 transition-all duration-300 ease-in-out'>
                        <Link
                            to={'/about-us'}
                            className='w-full flex flex-col space-y-3'>
                            <img className='w-[100px] h-[100px] mx-auto mb-8 mt-5' src="assets/appmainlogo.png" alt="faqlogo" />
                            <h3 className='text-center font-bold text-black '>Who is Ether Masterpiece? </h3>
                        </Link>
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 hover:transform hover:scale-110 transition-all duration-300 ease-in-out'>
                        <Link
                            to={'/support-center'}
                            className='w-full flex flex-col space-y-3'>
                            <BiSupport className='mx-auto text-[100px] my-5 text-blue-400' />
                            <h3 className='text-center font-bold text-black '>Contact Us </h3>
                        </Link>
                    </article>

                </div>
            </section>
        </main>
    )
}

export default FaqHub