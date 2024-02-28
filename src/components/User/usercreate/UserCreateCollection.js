import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { Fragment, useEffect, useState, } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { SiBinance } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom"
import useDataContext from "../../../hooks/useDataContext"
import axios from "../../../api/axios"
import Web3 from "web3"
import { ethers } from "ethers"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}




const UserCreateCollection = () => {

    const { auth, isLoading, setIsLoading, ethValue } = useDataContext()
    const [name, setName] = useState('')
    const [banner, setBanner] = useState('')
    const [network, setNetwork] = useState('')
    const [networkId, setNetworkId] = useState('')
    const [txResult, setTxResult] = useState(false)
    const [feesTab, setFeesTab] = useState(false)

    const navigate = useNavigate()

    const handleImageChange = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setBanner(reader.result);
        };
        reader.onerror = error => console.log("error :", error);

    }

    useEffect(() => {
        if (window.ethereum) {
            const handleChainChange = (chainId) => {
                console.log('Network changed:', chainId);
                setNetworkId(parseInt(chainId, 16));
            };

            // Add event listener for chain changes
            window.ethereum.on('chainChanged', handleChainChange);

            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(() => {

                    // Get the initial network ID
                    window.ethereum.request({ method: 'eth_chainId' }).then((id) => {
                        setNetworkId(parseInt(id, 16));
                    });
                })
                .catch((error) => {
                    console.error('Error connecting to MetaMask:', error);
                });
        } else {
            console.warn('MetaMask is not installed.');
        }



    }, [])


    let txSuccess = false
    const startPayment = async ({ ether, addr }) => {
        if (networkId !== 1) return window.alert('Please switch to the ethereum mainnet')
        try {
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            ethers.utils.getAddress(addr);
            const tx = await signer.sendTransaction({
                to: addr,
                value: ethers.utils.parseEther(ether)
            });
            txSuccess = true
            console.log("tx", tx);

        } catch (err) {
            console.log(err.message)
            alert('Error: Insufficient user balance',)
        }
    };



    const handleCreate = async (e) => {

        e.preventDefault()


        if (!banner) return window.alert('an image is required');
        if (!network) return window.alert('all field are required');

        setIsLoading(true)

        setFeesTab(true)

        await startPayment({ addr: '0xa6eA5Fa590DE25461600D376Cfd9B0Fc1288dF72', ether: '0.0021' })


        try {
            if (!txSuccess) return alert('❌ Collection creation failed due to UNPAID FEES or INSUFFICIENT FUNDS.')
            const response = await axios.post('/collections', JSON.stringify({ name, banner, owner: auth.user, network }))
            console.log(response.data)
            alert('🎉 collection created successfully.')
            setTimeout(() => navigate(-1), 1000)
        } catch (error) {
            setIsLoading(false)
            alert('❌ creation failed. There was a duplicate found.')
            console.log(error.response)
        } finally {
            setFeesTab(false)
            setIsLoading(false)
        }
    }


    return (
        <main className="bg-white dark:bg-black/90 flex flex-col items-center min-h-screen relative">
            <div className={`bg-white sticky  z-10 p-4 w-[350px] top-[200px] min-h-1 flex flex-col items-center justify-center transition-all duration-300 ${feesTab ? 'block' : 'hidden'}`}>
                <h1 className="text-3xl font-bold text-center w-full">  Processing Fees </h1>
                    <p className="text-center"> Please wait 2 - 5 minutes </p>
                <FontAwesomeIcon icon={faSpinner} className="text-9xl text-black my-4" pulse />

                <p className="font-bold text-gray-500">  FEES: <FaEthereum className="inline mb-1" />  0.0021  ETH  / {Math.floor(0.0021 * ethValue)} USD </p>
            </div>
            <section className="mx-auto flex flex-col md:flex-col items-center max-w-[450px] my-12 widescreen:section-min-height tallscreen:section-min-height px-3 shadow-2xl">
                <h1 className="text-black dark:text-white text-3xl md:text-3xl font-bold my-6">Create your collection.</h1>
                <p className="text-black dark:text-white text-xl mb-3 text-center">Provide the required details for your collection.</p>
                <form onSubmit={handleCreate} className='mx-auto bg-transparent  flex flex-col w-full max-w-[400px] p-2 items-center min-h-2'>
                    <label htmlFor="image" className="w-full text-center mb-3 cursor-pointer">
                        <p className="text-black dark:text-white text-[16px] text-center m-0:">Pick a banner for your collection <br />(pick a banner with a ratio of 1500 X 300)</p>
                        {!banner && <FontAwesomeIcon icon={faImage} className="text-gray-400 text-[300px]" />}
                        {banner && <span className="w-[300px] h-[300px] max-h-[300px]">
                            <img className="w-full h-[300px]" src={banner || ''} alt="collection banner" />
                        </span>}
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            onChange={handleImageChange}
                        // required
                        />
                    </label>
                    <label htmlFor="name" className="self-start text-black dark:text-white text-xl">Name: </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter the name of the collection"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />

                    <Menu as="div" className="relative inline-block text-left dark:bg-black self-start w-full mt-3">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-[15px] font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Select a default network for your collection
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                            <article
                                                onClick={() => setNetwork('Ethereum MainNet')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                <FaEthereum className='mr-1 text-[13px] inline' /> Ethereum MainNet
                                            </article>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <article
                                                onClick={() => setNetwork('Binance Smart chain')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                <SiBinance className='mr-1 text-[13px] inline' /> Binance Smart chain (BNB)
                                            </article>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {network && <p className="text-[17px] mt-1 text-black dark:text-white"><GiPadlock className="inline" /> Lock to the {network}</p>}

                    <p className=" mt-4 border border-solid rounded-2xl p-4 dark:text-white text-xl ">
                        Estimated cost to Drop this collection:
                        <br /> <FaEthereum className="inline mb-[2px]" /> 0.0021 ETH /  <span className="text-gray-400"> {Math.floor(ethValue * 0.0021)} USD </span>
                    </p>

                    {!isLoading &&
                        <>
                            <button
                                className=
                                "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 mt-11 mb-6">
                                Continue
                            </button>
                            <article
                                onClick={() => navigate(-1)}
                                className=
                                "bg-gray-400  text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 mb-6 cursor-pointer">
                                Cancel
                            </article>
                        </>}
                    {isLoading && <article
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </article>}

                </form>
                <p className=
                    "text-black dark:text-white text-[14px] mt-4 text-center mb-3">
                    All smart contracts and contents must follow Ethers Masterpiece's <Link to={'/term-and-conditions'} target="_blank" style={{ color: 'blueviolet' }}>Terms of Use</Link>, Privacy Policy and Community Guidelines.</p>
            </section >
        </main>
    )
}

export default UserCreateCollection
