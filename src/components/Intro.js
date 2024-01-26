import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHandshake } from "react-icons/fa6";
import { MdSupportAgent, MdNewReleases } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import useDataContext from '../hooks/useDataContext'

const Intro = () => {
    const { allAssets } = useDataContext()

    const lastFour = allAssets?.slice(-4)

    console.log(lastFour)

    const SecComp = () => {
        return (
            lastFour?.map((item, i) => (
                <article key={i} className='max-w-[300px] w-full  bg-black rounded-xl overflow-hidden h-[300px] max-h-[300px] relative'>
                    <img
                        className='w-full h-full'
                        src={item?.image} alt="homepage" />
                    <div className='absolute top-3 left-3 bg-black p-3'>
                        <p className='text-white'>
                            {item?.category}
                        </p>
                    </div>
                </article>
            ))
        )
    }

    return (
        <main className='bg-white dark:bg-black/60 w-full min-h-screen'>
            <section className='w-full min-h-[90vh]'>
                <video src="assets/appbackground.mp4" loop autoPlay muted playsInline className='w-full h-full absolute right-0 bottom-0 z-[-1] object-fill'>

                </video>

                <section className='max-w-4xl mx-auto w-full p-3 flex items-center justify-center min-h-[90vh]'>
                    <div>
                        <h2 className='text-5xl font-bold dark:text-white text-left'>
                            Ethers MasterPieces easily buy and sell you assets
                        </h2>
                        <h3 className='mt-6 dark:text-white text-xl'>
                            Discover boundless creativity on Ether Masterpiece – an exclusive NFT platform where visionary artists tokenize their exceptional works. Immerse yourself in a world of digital art, where every masterpiece is uniquely crafted on the Ethereum blockchain, creating a decentralized gallery of unparalleled beauty and innovation.
                        </h3>

                        <Link className='bg-black w-52 p-2 rounded-2xl text-center block text-white text-2xl mt-7'> Get Started </Link>
                    </div>
                </section>


            </section>
            <hr className='bg-white mx-auto max-w-3xl' />
            <h2 className='text-3xl font-bold text-center w-full dark:text-white bg-black py-6'>Discover Unique Assets</h2>

            <section className='bg-black w-full'>

                <section className='mx-auto max-w-4xl min-h-screen radial-black'>
                    <div className='w-full p-4 flex flex-wrap gap-8 items-center justify-center relative'>
                        <div className='bg-black/60 absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center'>
                            <p className='text-2xl font-medium dark:text-white px-16'>
                                Dive into a vast array of digital treasures within our platform, where we provide an extensive selection of assets, ranging from exclusive NFTs to captivating digital art and a plethora of other unique and collectible creations.
                            </p>
                        </div>

                        {SecComp()}
                    </div>

                </section>
            </section>
            <h2 className='text-3xl font-bold text-center w-full dark:text-white bg-black pt-6'>Features</h2>

            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex md:flex-row gap-4 items-center justify-center'>
                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl dark:text-white'> Secure Wallet Integration.</h3>
                        <p className='dark:text-white'>This feature allows you to securely connect your wallet either Meta Mask and Trust wallet, enabling you to interact with blockchain networks and perform transactions Seamlessly.</p>
                    </div>
                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        <img src="assets/cyrptowallet.png" alt="wallet" className='w-72 h-52 rounded-xl' />
                    </div>
                </section>
            </section>
            <hr className='bg-white mx-auto max-w-3xl' />

            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex md:flex-row gap-4 items-center justify-center'>
                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        <img src="assets/deal.png" alt="wallet" className='w-52 h-52 rounded-xl' />
                        {/* <FaHandshake className='text-[300px] text-white' /> */}
                    </div>
                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl dark:text-white'>STANDBY BUYERS.</h3>
                        <p className='dark:text-white'>This feature allows you to securely connect your Meta Mask, enabling you to interact with blockchain networks and perform transactions Seamlessly.</p>
                    </div>

                </section>
            </section>
            <hr className='bg-white mx-auto max-w-3xl' />
            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex md:flex-row gap-4 items-center justify-center'>

                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl dark:text-white'> 24/7 SUPPORT.</h3>
                        <p className='dark:text-white'>This feature allows you to securely connect your Meta Mask, enabling you to interact with blockchain networks and perform transactions Seamlessly.</p>
                    </div>
                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        <img src="assets/support.png" alt="wallet" className='w-52 h-52 rounded-xl' />
                        {/* <MdSupportAgent className='text-[300px] text-white' /> */}
                    </div>

                </section>
            </section>
            <hr className='bg-white mx-auto max-w-3xl' />
            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex md:flex-row gap-4 items-center justify-center'>


                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        {/* <BsCashCoin className='text-[300px] text-white' /> */}
                        <img src="assets/fees.png" alt="wallet" className='w-52 h-52 rounded-xl' />
                    </div>
                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl dark:text-white'> LOW TRADE FEES.</h3>
                        <p className='dark:text-white'>This feature allows you to securely connect your Meta Mask, enabling you to interact with blockchain networks and perform transactions Seamlessly.</p>
                    </div>

                </section>
            </section>
            <hr className='bg-white mx-auto max-w-3xl' />
            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex md:flex-row gap-4 items-center justify-center'>

                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl dark:text-white'> PRIORITIZES NEW ASSETS.</h3>
                        <p className='dark:text-white'>This feature allows you to securely connect your Meta Mask, enabling you to interact with blockchain networks and perform transactions Seamlessly.</p>
                    </div>
                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        <img src="assets/priortize.png" alt="wallet" className='w-52 h-52 rounded-xl' />
                        {/* <MdNewReleases className='text-[300px] text-white' /> */}
                    </div>


                </section>
            </section>

            <hr className='bg-white mx-auto max-w-3xl' />
            <h2 className='text-3xl font-bold text-center w-full dark:text-white bg-black py-6'>Get Access to a Range of Tools</h2>


            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen py-7'>
                    <div className='w-full p-4 flex flex-wrap gap-8 items-center justify-center'>
                        <article className='max-w-[300px] w-full flex flex-col bg-white rounded-xl overflow-hidden h-[300px] max-h-[300px] relative'>
                            <div className='basis-2/5 w-full overflow-hidden'>
                                <img className='w-full ' src="assets/digiarts.jpg" alt="detail" />
                            </div>
                            <div className='basis-3/5 w-full p-3'>
                                <h3 className='text-2xl text-black font-bold mb-3'>Digital Arts</h3>
                                <p className='text-gray-500 ' style={{ lineHeight: '16px' }}>
                                    Explore a mesmerizing realm of digital art on EthersMasterpiece, where each NFT collection tells a unique story.
                                </p>
                                <Link to={'/user-authentication-register'} className='text-nowrap inline-block bg-black text-white p-3 mt-3 rounded-xl'> Get Started </Link>
                            </div>
                        </article>
                        <article className='max-w-[300px] w-full flex flex-col bg-white rounded-xl overflow-hidden h-[300px] max-h-[300px] relative'>
                            <div className='basis-2/5 w-full overflow-hidden'>
                                <img className='w-full ' src="assets/nfts.png" alt="detail" />
                            </div>
                            <div className='basis-3/5 w-full p-3'>
                                <h3 className='text-2xl text-black font-bold mb-3'>NFTS</h3>
                                <p className='text-gray-500 ' style={{ lineHeight: '16px' }}>
                                    Discover a realm of endless creativity in the NFTs section of EthersMasterpiece, where unique digital treasures await.
                                </p>
                                <Link to={'/user-authentication-register'} className='text-nowrap inline-block bg-black text-white p-3 mt-3 rounded-xl'> Get Started </Link>
                            </div>
                        </article>
                        <article className='max-w-[300px] w-full flex flex-col bg-white rounded-xl overflow-hidden h-[300px] max-h-[300px] relative'>
                            <div className='basis-2/5 w-full overflow-hidden'>
                                <img className='w-full ' src="assets/aiarts.webp" alt="detail" />
                            </div>
                            <div className='basis-3/5 w-full p-3'>
                                <h3 className='text-2xl text-black font-bold mb-3'>Ai Arts</h3>
                                <p className='text-gray-500 ' style={{ lineHeight: '16px' }}>
                                    Embark on a captivating journey through the AI arts realm, where algorithms weave digital wonders.
                                </p>
                                <Link to={'/user-authentication-register'} className='text-nowrap inline-block bg-black text-white p-3 mt-3 rounded-xl'> Get Started </Link>
                            </div>
                        </article>
                        <article className='max-w-[300px] w-full flex flex-col bg-white rounded-xl overflow-hidden h-[300px] max-h-[300px] relative'>
                            <div className='basis-2/5 w-full overflow-hidden'>
                                <img className='w-full ' src="assets/pfps.jpg" alt="detail" />
                            </div>
                            <div className='basis-3/5 w-full p-3'>
                                <h3 className='text-2xl text-black font-bold mb-3'>PFPs</h3>
                                <p className='text-gray-500 ' style={{ lineHeight: '16px' }}>
                                    Dive into a captivating array of exclusive Profile Pictures, where digital expressions become unique statements on EthersMasterpiece.
                                </p>
                                <Link to={'/user-authentication-register'} className='text-nowrap inline-block bg-black text-white p-3 mt-3 rounded-xl'> Get Started </Link>
                            </div>
                        </article>
                        <article className='max-w-[300px] w-full flex flex-col bg-white rounded-xl overflow-hidden h-[300px] max-h-[300px] relative'>
                            <div className='basis-2/5 w-full overflow-hidden'>
                                <img className='w-full ' src="assets/etherbanner.webp" alt="detail" />
                            </div>
                            <div className='basis-3/5 w-full p-3'>
                                <h3 className='text-2xl text-black font-bold mb-3'>Ethereum Mainnet</h3>
                                <p className='text-gray-500 ' style={{ lineHeight: '16px' }}>
                                    Leverage the Ethereum mainnet integration for seamless and secure transactions on your EthersMasterpiece website.
                                </p>
                                <Link to={'/user-authentication-register'} className='text-nowrap inline-block bg-black text-white p-3 mt-3 rounded-xl'> Get Started </Link>
                            </div>
                        </article>
                        <article className='max-w-[300px] w-full flex flex-col bg-white rounded-xl overflow-hidden h-[300px] max-h-[300px] relative'>
                            <div className='basis-2/5 w-full overflow-hidden'>
                                <img className='w-full ' src="assets/bnbbanner.png" alt="detail" />
                            </div>
                            <div className='basis-3/5 w-full p-3'>
                                <h3 className='text-2xl text-black font-bold mb-3'>Binance Smart Chain</h3>
                                <p className='text-gray-500 ' style={{ lineHeight: '16px' }}>
                                    Unlock new opportunities by seamlessly integrating Binance Smart Chain into your EthersMasterpiece experience.
                                </p>
                                <Link to={'/user-authentication-register'} className='text-nowrap inline-block bg-black text-white p-3 mt-3 rounded-xl'> Get Started </Link>
                            </div>
                        </article>
                    </div>
                </section>
            </section>

            <h2 className='text-3xl font-bold text-center w-full dark:text-white bg-black py-6'>Testimonials and Reviews</h2>
            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen py-7'>
                    <article className='w-full p-6 bg-slate-800 rounded-2xl my-2'>


                    </article>
                    <article className='w-full p-6 bg-slate-800 rounded-2xl my-2'>


                    </article>
                    <article className='w-full p-6 bg-slate-800 rounded-2xl my-2'>


                    </article>
                    <div className='flex flex-col items-center mt-4'>
                        <h4 className='text-2xl font-bold dark:text-white mb-5'>Help keep the Streak with your review</h4>
                        <Link
                            to={''}
                        >
                            <img className='w-[350px] h-[200px]' src="assets/trustp.png" alt="trustpilot" />
                        </Link>
                    </div>
                </section>
            </section>

            <h2 className='text-3xl font-bold text-center w-full dark:text-white bg-black py-6'>Trusted Partners</h2>
            <section className='bg-black/95 w-full'>
                <section className='mx-auto max-w-4xl min-h-[50vh] py-7'>
                    <div className='w-full flex gap-5 space-x-6 items-center justify-center'>
                        <div>
                            <img className='w-[200px] h-[200px] mx-auto' src="assets/metamasklogo.png" alt="metamask wallet" />
                            <h3 className='text-center text-4xl dark:text-white font-bold'>Metamask Wallet</h3>
                        </div>
                        <div>
                            <img src="assets/trustlogo.png" className='mx-auto w-[200px] h-[200px]' alt="trust wallet" />
                            <h3 className='text-center text-4xl dark:text-white font-bold'>Trust Wallet</h3>
                        </div>
                    </div>
                </section>
            </section>
            <section className="w-full   bg-gradient-to-r from-violet-500 to-fuchsia-500">
                <section className='mx-auto max-w-4xl min-h-[40vh] py-7 flex flex-col items-center justify-center'>
                    <h2 className='text-4xl text-white font-bold'>
                        Begin your NFT Journey with Ethers Masterpiece.
                    </h2>
                    <p>
                        bringing together a diverse array of artistic expressions from creators worldwide.
                    </p>
                    <Link
                        to={'/user-authentication-register'}
                        className='bg-black w-52 p-2 rounded-2xl text-center block text-white text-2xl mt-7'>
                        Get Started
                    </Link>

                </section>
            </section>

        </main>
    )
}

export default Intro