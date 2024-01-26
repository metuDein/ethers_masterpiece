import React from 'react'
import { Link } from 'react-router-dom'

const WalletIntegretion = () => {
    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6 text-black dark:text-white'>
            <section className='max-w-4xl mx-auto'>
                <h1 className='text-black dark:text-white text-4xl font-bold'>How to Connect Your Wallet</h1>
                <h2 className='mt-4 font-bold text-xl text-center'>How to connect your metamask wallet</h2>
                <div className="w-full flex flex-wrap flex-row flex-auto items-start justify-center gap-6 min-h-[50vh] my-12 mt-2  p-2">
                    <article className='w-full justify-self-start align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'> Firstly we advise you complete this process on your pc </p>
                        <p className='font-medium px-2'>You must have the metamask extension or mobile app. </p>
                        <Link className='my-2 mt-4 block text-center hover:underline text-purple-600'>Click to get it.</Link>
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100  text-black'>
                        <p className='my-2 text-black px-2'>If you are a new user the connect wallet button should be visible on the top right hand side of The page once your are logged in. As shown below </p>
                        <img src="assets/tutimages/connectwallet.png" alt="connectbutton" />


                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Once you click on the connect Button it Should open up the connect wallet tab choose the Metamask option.  </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/selectmeta.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Your are required to provide the required details for your wallet intergration.  </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/keytab.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>To get you key open the metamask extension on your chrome browers and tap on the three dots as shown below</p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/threedots.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Select the account details section </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/acctdetails.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Tap on the Shown private key option and input your wallet password</p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/privatetab.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Once your input your password tap and hold the "HOLD TO REVEAL PRIVATEKEY" button and copy your private key </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/copykey.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Paste your key in the connect wallet tab and click the continue button </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/continue.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Your meatmask app should open, select the account your wish to connect and finish the process. </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/selectaccount.png" alt="connectbutton" />
                    </article>

                </div>

                <h2 className='mt-[50px] font-bold text-xl text-center'>How to connect your trust wallet</h2>


                <div className="w-full flex flex-wrap flex-row flex-auto items-start justify-center gap-6 min-h-[50vh] my-12 mt-2  p-2">
                    <article className='w-full justify-self-start align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'> Firstly we advise you complete this process on your pc </p>
                        <p className='font-medium px-2'>You must have the trust wallet extension or mobile app. </p>
                        <Link className='my-2 mt-4 block text-center hover:underline text-purple-600'>Click to get it.</Link>
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100  text-black'>
                        <p className='my-2 text-black px-2'>If you are a new user the connect wallet button should be visible on the top right hand side of The page once your are logged in. As shown below </p>
                        <img src="assets/tutimages/connectwallet.png" alt="connectbutton" />


                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Once you click on the connect Button it Should open up the connect wallet tab choose the trust wallet option.  </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/selectmeta.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Your are required to provide the required details for your wallet intergration.  </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/tprovidekey.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>To get your 12 word phrase open the trust wallet extension on your chrome browers and tap on the settings option as shown below</p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/Ttab.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Select the view secret phrase option </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/tsettings.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Input your wallet password to view your secret phrase</p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/tpass.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>copy the 12 words phrase to a notepad or download and open the file</p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/tcopykey.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Paste your key in the connect wallet tab and click the continue button </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/tlaststep.png" alt="connectbutton" />
                    </article>
                    <article className='w-full justify-self-center align-middle max-w-[300px] min-h-[199px]  h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'>Your Trust wallet app should open, select the account your wish to connect and finish the process. </p>
                        {/* <img src="assets/tutimages/selectmeta.png" alt="connectbutton" /> */}
                        <img src="assets/tutimages/tfinal.png" alt="connectbutton" />
                    </article>

                </div>
            </section>
        </main>
    )
}

export default WalletIntegretion