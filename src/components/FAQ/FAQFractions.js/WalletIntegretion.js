import React from 'react'
import { Link } from 'react-router-dom'

const WalletIntegretion = () => {
    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6 text-black dark:text-white'>
            <section className='max-w-4xl mx-auto'>
                <h1 className='text-black dark:text-white text-4xl font-bold text-center'>How to Connect Your Wallet</h1>
                <h2 className='mt-4 font-bold text-xl text-center'>How to connect your metamask wallet</h2>
                <p className='text-[15px] p-2'>Your wallets private key or 12 word phrase might be requested when connecting your wallet. Your private key helps with application programming interface...it creates a user interface that's easy to use. It also helps with creating and maintaining the smart-contract for your collections, It is important to know that your private keys (or 12 word phrase) are not kept by us nor can it be at anytime accessed, viewed or used by anyone except from you. If you want to change your wallet please speak with our customer care.</p>
                <div className="w-full flex flex-wrap flex-row flex-auto items-start justify-center gap-6 min-h-[50vh] my-12 mt-2  p-2">
                    <article className='w-full justify-self-start align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'> Firstly we advise you complete this process on your pc and also be careful when accessing your private key and 12 word phrases. </p>
                        <p className='font-medium px-2'>You must have the metamask extension or mobile app. </p>
                        <Link
                            target='_blank'
                            to={'https://metamask.io/download/'}
                            className='my-2 mt-4 block text-center hover:underline text-purple-600'>Click to get it.</Link>
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
                <div>
                    <h2 className='font-meduim text-xl underline'> How to connect your metamask wallet on mobile</h2>
                    <ul className='list-decimal'>
                        <li className='my-1 text-[14px]'>
                            You must have the the metamask wallet app installed  <Link
                                to={'https://metamask.io/download/'}
                                target='_blank'
                                className='font-medium text-indigo-600'>click to get it.</Link>
                        </li>
                        <li className='my-1 text-[14px]'>
                            Login to your   <Link
                                target='_blank'
                                to={'https://ethersmasterpiece.com'}
                                className='font-medium text-indigo-600'>Ethersmasterpiece </Link>
                            account via the metamask mobile app browser option located at the bottom of the metamask app.
                        </li>
                        <li className='my-1 text-[14px]'>
                            If you haven't connected your wallet the CONNECT WALLET button should be visible at the top of the page once you are Logged in.
                        </li>
                        <li className='my-1 text-[14px]'>
                            Once your select the metamask option you will be prompted to provide your private key
                        </li>
                        <li className='my-1 text-[14px]'>
                            To get your private navigate to the wallet section of the app and tap on the three dots on beside your current wallets address and select-{'>'}SHOW PRIVATE KEY option
                        </li>
                        <li className='my-1 text-[14px]'>
                            Input your password for your app and copy the key and return to the browser section and paste it on the tab where it is required.
                        </li>
                        <li className='my-1 text-[14px]'>
                            If the key is valid a prompt will be generated by the metamask app for you to select the address you are connecting.
                        </li>
                        <li className='my-1 text-[14px]'>
                            Select the wallet whose private Key you copied and select continue.
                        </li>
                    </ul>
                </div>
                <p className='text-xl'>Your wallet should now be connected successfully and your profile will be updated</p>

                <h2 className='mt-[50px] font-bold text-xl text-center'>How to connect your trust wallet</h2>


                <div className="w-full flex flex-wrap flex-row flex-auto items-start justify-center gap-6 min-h-[50vh] my-12 mt-2  p-2">
                    <article className='w-full justify-self-start align-middle max-w-[300px] min-h-[199px] max-h-[220px] h-full rounded-xl shadow-2xl border border-gray-400 bg-gray-100 text-black'>
                        <p className='my-2 text-black font-medium px-2'> Firstly we advise you complete this process on your pc </p>
                        <p className='font-medium px-2'>You must have the trust wallet extension or mobile app. </p>
                        <Link
                            target='_blank'

                            to={'https://trustwallet.com/download'}
                            className='my-2 mt-4 block text-center hover:underline text-purple-600'>Click to get it.</Link>
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
                <div>
                    <h2 className='font-meduim text-xl underline'> How to connect your trust wallet on mobile</h2>
                    <ul className='list-decimal'>
                        <li className='my-1 text-[14px]'>
                            You must have the the trust wallet app installed  <Link
                                to={'https://trustwallet.com/download'}
                                target='_blank'
                                className='font-medium text-indigo-600'>click to get it.</Link>
                        </li>
                        <li className='my-1 text-[14px]'>
                            Login to your   <Link
                                target='_blank'
                                to={'https://ethersmasterpiece.com'}
                                className='font-medium text-indigo-600'>Ethersmasterpiece </Link>
                            account via the trust wallet mobile app browser option located at the bottom of the trust wallet app.
                        </li>
                        <li className='my-1 text-[14px]'>
                            If you haven't connected your wallet the CONNECT WALLET button should be visible at the top of the page once you are Logged in.
                        </li>
                        <li className='my-1 text-[14px]'>
                            Once your select the trust wallet option you will be prompted to provide your 12 word phrase
                        </li>
                        <li className='my-1 text-[14px]'>
                            To get your 12 words phrase navigate to the wallet section of the app and tap on the SETTING icon on the top left of the app. Select the WALLETS option.
                        </li>
                        <li className='my-1 text-[14px]'>
                            Tap on the three dot beside your current wallet choose the MANUAL option.
                        </li>
                        <li className='my-1 text-[14px]'>
                            You will be prompted to enter your password. Next your should see your 12 words phrase copy them to a notepad and paste on the wallet tab where it is required.
                        </li>
                        <li className='my-1 text-[14px]'>
                            If the 12 words phrase is valid a prompt will be generated by the trust wallet app for you to select the address you are connecting.
                        </li>
                        <li className='my-1 text-[14px]'>
                            Select the wallet whose 12 words phrase you copied and select continue.
                        </li>
                    </ul>
                </div>
                <p className='text-xl'>Your wallet should now be connected successfully and your profile will be updated. <br /> If your experiencing issues using trust wallet please connect to VPN and retry</p>
            </section>
        </main>
    )
}

export default WalletIntegretion