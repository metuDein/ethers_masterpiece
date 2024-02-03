import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useDataContext from '../hooks/useDataContext'
import { CiLocationOn } from "react-icons/ci";

const Intro = () => {
    const { allAssets } = useDataContext()

    const lastFour = allAssets?.slice(-4)

    // console.log(lastFour)

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
        <main className='bg-black/65 w-full min-h-screen z-[-2]'>
            <section className='w-full min-h-[100vh]'>
                <video src="assets/appbackground.mp4" loop autoPlay muted playsInline className='w-full h-full z-[-1] absolute object-fill'>

                </video>

                <section className='max-w-4xl mx-auto w-full p-3 flex items-center justify-center min-h-[90vh]'>
                    <div>
                        <h2 className='text-3xl md:text-5xl font-bold text-white text-center md:text-left'>
                            Ethers MasterPiece easily buy and sell your assets
                        </h2>
                        <h3 style={{ lineHeight: '20px' }} className='mt-6 text-white text-[14px] md:text-[16px] text-center md:text-left'>
                            Discover boundless creativity on Ether Masterpiece an exclusive NFT platform where visionary artists tokenize their exceptional works. Immerse yourself in a world of digital art, where every masterpiece is uniquely crafted on the Ethereum blockchain, creating a decentralized gallery of unparalleled beauty and innovation.
                        </h3>

                        <Link
                            to={'/user-authentication-register'}
                            className='bg-black w-52 p-2 rounded-2xl md:mx-1 mx-auto text-center block text-white text-2xl mt-7'> Get Started </Link>
                    </div>
                </section>


            </section>
            <hr className='bg-white mx-auto max-w-3xl' />
            <h2 className='text-3xl font-bold text-center w-full text-white bg-black py-6'>Discover Unique Assets</h2>

            <section className='bg-black w-full'>

                <section className='mx-auto max-w-4xl min-h-screen radial-black'>
                    <div className='w-full p-4 flex flex-wrap gap-8 items-center justify-center relative'>
                        <div className='bg-black/60 absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center'>
                            <p className='text-2xl font-normal md:font-medium text-white text-center p-3 md:px-16 '>
                                Dive into a vast array of digital treasures within our platform, where we provide an extensive selection of assets, ranging from exclusive NFTs to captivating digital art and a plethora of other unique and collectible creations.
                            </p>
                        </div>

                        {SecComp()}
                    </div>

                </section>
            </section>
            <hr className='bg-black/60 mx-auto max-w-3xl' />
            <h2 className='text-3xl font-bold text-center w-full text-white bg-black pt-6'>Features</h2>

            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex flex-col md:flex-row gap-4 items-center justify-center'>
                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl text-white mb-4 text-center md:text-left'> SECURE WALLET INTERGRATION.</h3>
                        <p className='text-white text-center md:text-left'>Empower your digital experience by seamlessly integrating our secure connection feature, enabling you to effortlessly link your MetaMask or Trust Wallet. Through this enhanced connection, you gain the ability to interact seamlessly with various blockchain networks, facilitating secure and swift transactions that align with the dynamic capabilities of decentralized technologies.</p>
                    </div>
                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        <img src="assets/cyrptowallet.png" alt="wallet" className='w-72 h-52 rounded-xl' />
                    </div>
                </section>
            </section>
            <hr className='bg-white mx-auto max-w-3xl' />

            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex flex-col md:flex-row gap-4 items-center justify-center'>
                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        <img src="assets/deal.png" alt="wallet" className='w-52 h-52 rounded-xl' />
                        {/* <FaHandshake className='text-[300px] text-white' /> */}
                    </div>
                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl text-white mb-4 text-center md:text-left'>STANDBY BUYERS.</h3>
                        <p className='text-white text-center md:text-left'>By showcasing your NFT on EthersMasterpiece, you not only introduce your digital creations to a broad and diverse network of potential buyers but also position them to be discovered and appreciated by a community actively seeking unique and valuable assets. This exposure opens up new horizons for your creations, inviting art enthusiasts, collectors, and investors who are eager to engage with and acquire distinctive pieces within the dynamic and thriving ecosystem of EthersMasterpiece..</p>
                    </div>

                </section>
            </section>
            <hr className='bg-white mx-auto max-w-3xl' />
            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex flex-col md:flex-row gap-4 items-center justify-center'>

                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl text-white text-center md:text-left'> 24/7 SUPPORT.</h3>
                        <p className='text-white text-center md:text-left'>
                            At EthersMasterpiece, our commitment to your satisfaction and success is unwavering. Recognizing the diverse needs of our users, we have implemented a robust 24/7 support system. This means that our dedicated team is always ready to provide timely and comprehensive assistance, ensuring that you have the support you need, precisely when you need it. Your experience on our platform matters, and our around-the-clock support reflects our dedication to delivering a seamless and positive journey for every user, no matter the time zone or circumstance.</p>
                    </div>
                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        <img src="assets/support.png" alt="wallet" className='w-52 h-52 rounded-xl' />
                        {/* <MdSupportAgent className='text-[300px] text-white' /> */}
                    </div>

                </section>
            </section>
            <hr className='bg-white mx-auto max-w-3xl' />
            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex flex-col md:flex-row gap-4 items-center justify-center'>


                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        {/* <BsCashCoin className='text-[300px] text-white' /> */}
                        <img src="assets/fees.png" alt="wallet" className='w-52 h-52 rounded-xl' />
                    </div>
                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl text-white text-center md:text-left'> LOW TRADE FEES.</h3>
                        <p className='text-white text-center md:text-left'>In the ethos of EthersMasterpiece, we deeply appreciate the significance of cost efficiency in the dynamic world of buying and selling NFTs. Our commitment to your financial well-being is reflected in our dedication to providing a seamless experience with low gas fees. This means that as you engage in transactions on our platform, you can be confident that the associated costs are kept minimal, allowing you to navigate the exciting realm of NFTs without the burden of exorbitant fees, and ensuring that your financial resources are optimized for your creative endeavors and digital investments.</p>
                    </div>

                </section>
            </section>
            <hr className='bg-white mx-auto max-w-3xl' />
            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen flex flex-col md:flex-row gap-4 items-center justify-center'>

                    <div className='basis-2/4 p-3 '>
                        <h3 className='text-xl text-white text-center md:text-left'> PRIORITIZES NEW ASSETS.</h3>
                        <p className='text-white text-center md:text-left'>
                            At Ethers Masterpiece, our commitment lies in fostering a vibrant and inclusive ecosystem for creators within the NFT space. We hold a firm belief in providing unwavering support and promotion to burgeoning artists who bring fresh perspectives and creativity to our platform. By prioritizing the visibility and exposure of recently uploaded assets, we aim to cultivate an environment where the work of new and emerging talents shines brightly, capturing the attention and admiration they rightfully deserve. We are dedicated to creating a dynamic space that not only values the established but also actively encourages the growth and recognition of artists who are just embarking on their journey in the NFT realm.</p>
                    </div>
                    <div className='basis-2/4 p-3 flex items-center justify-center'>
                        <img src="assets/priortize.png" alt="wallet" className='w-52 h-52 rounded-xl' />
                        {/* <MdNewReleases className='text-[300px] text-white' /> */}
                    </div>


                </section>
            </section>

            <hr className='bg-white mx-auto max-w-3xl' />
            <h2 className='text-3xl font-bold text-center w-full text-white bg-black py-6'>Get Access to a Range of Tools</h2>


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

            <h2 className='text-3xl font-bold text-center w-full text-white bg-black py-6'>Testimonials and Reviews</h2>
            <section className='bg-black w-full'>
                <section className='mx-auto max-w-4xl min-h-screen py-7 px-4'>
                    <article className='w-full p-6 bg-slate-800 rounded-2xl my-2'>
                        <div className='w-full border-b border-solid flex justify-between items-center'>
                            <h3 className='text-xl font-bold text-white'> Lewis Fred </h3>
                            <h4 className='text-xl text-white'>{('Just incredible there’s not their…').substring(0, 18)}...</h4>
                            <p className='text-white font-bold text-nowrap'> <CiLocationOn className='inline text-xl text-white mb-1' /> US </p>
                        </div>
                        <p className='w-full text-white text-xl py-2 text-left'>
                            Just incredible there’s not their support can’t handle. they are cool headed very cool headed
                        </p>
                        <p className='text-white'>
                            <span className='font-bold text-xl text-white'>Date of experience : </span> March 28, 2023
                        </p>
                    </article>
                    <article className='w-full p-6 bg-slate-800 rounded-2xl my-2'>
                        <div className='w-full border-b border-solid flex justify-between items-center'>
                            <h3 className='text-xl font-bold text-white'> Willams shawn </h3>
                            <h4 className='text-xl text-white'>{('low gas fees one if the lowest rates i…').substring(0, 18)}...</h4>
                            <p className='text-white font-bold text-nowrap'> <CiLocationOn className='inline text-xl text-white mb-1' /> US </p>
                        </div>
                        <p className='w-full text-white text-xl py-2 text-left'>
                            low gas fees one of the lowest rates i have seen on any nft marketplace.
                        </p>
                        <p className='text-white'>
                            <span className='font-bold text-xl text-white'>Date of experience : </span> February 14, 2023
                        </p>

                    </article>
                    <article className='w-full p-6 bg-slate-800 rounded-2xl my-2'>
                        <div className='w-full border-b border-solid flex justify-between items-center'>
                            <h3 className='text-xl font-bold text-white'> Gabriel Dave</h3>
                            <h4 className='text-xl text-white'>{('I was a bit skeptical when i was getting declined').substring(0, 18)}...</h4>
                            <p className='text-white font-bold text-nowrap'> <CiLocationOn className='inline text-xl text-white mb-1' /> US </p>
                        </div>
                        <p className='w-full text-white text-xl py-2 text-left'>
                            I was a bit skeptical when i was getting declined transactions but when i paid the gas fee i got transactions when through
                        </p>
                        <p className='text-white'>
                            <span className='font-bold text-xl text-white'>Date of experience : </span> October 19, 2023
                        </p>

                    </article>
                    <div className='flex flex-col items-center mt-4'>
                        <h3 className='text-2xl font-bold text-white mb-5 text-center'>Help keep the Streak with your review</h3>
                        <Link
                            to={'https://www.trustpilot.com/evaluate/ethersmasterpiece.com?stars=5'}
                            target='_blank'
                        >
                            <img className='w-[350px] h-[200px]' src="assets/trustp.png" alt="trustpilot" />
                        </Link>
                    </div>
                </section>
            </section>

            <h2 className='text-3xl font-bold text-center w-full text-white bg-black py-6'>Trusted Partners</h2>
            <section className='bg-black/95 w-full'>
                <section className='mx-auto max-w-4xl min-h-[50vh] py-7'>
                    <div className='w-full flex flex-col md:flex-row gap-5 space-x-6 items-center justify-center'>
                        <div>
                            <img className='w-[200px] h-[200px] mx-auto' src="assets/metamasklogo.png" alt="metamask wallet" />
                            <h3 className='text-center text-4xl text-white font-bold'>Metamask Wallet</h3>
                        </div>
                        <div>
                            <img src="assets/trustlogo.png" className='mx-auto w-[200px] h-[200px]' alt="trust wallet" />
                            <h3 className='text-center text-4xl text-white font-bold'>Trust Wallet</h3>
                        </div>
                    </div>
                </section>
            </section>
            <section className="w-full   bg-gradient-to-r from-violet-500 to-fuchsia-500">
                <section className='mx-auto max-w-4xl min-h-[40vh] py-7 flex flex-col items-center justify-center'>
                    <h2 className=' text-3xl md:text-4xl text-white font-bold text-center'>
                        Begin your NFT Journey with Ethers Masterpiece.
                    </h2>
                    <p className='text-center'>
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