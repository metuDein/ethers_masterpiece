import { useState, useEffect } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { IoLogoUsd, IoIosPulse } from "react-icons/io";
import ProfileAssetCard from '../../User/usercards/ProfileAssetCard';
import useDataContext from '../../../hooks/useDataContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SiBinance } from 'react-icons/si';
import { AiFillWarning } from "react-icons/ai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { axiosPrivate } from '../../../api/axios';
import Web3 from 'web3';
import { ethers } from 'ethers';



const CollectionDetails = () => {
    const [tab, setTab] = useState('stats')
    const [txResult, setTxResult] = useState(false)
    const [networkId, setNetworkId] = useState('')

    const { allAssets, allCollections, isLoading, setIsLoading, ethValue } = useDataContext()
    const { id } = useParams()
    const navigate = useNavigate()

    const collection = allCollections.find(col => col._id === id)
    const collAssets = allAssets.filter(asset => asset.collectionName === collection?.name)

    const [feesTab, setFeesTab] = useState(false)

    const calculateTotalPrice = (items) => {
        // Ensure that items is an array
        if (!Array.isArray(items)) {
            throw new Error('Input must be an array of objects with a "price" property.');
        }

        // Use reduce to sum up the prices
        const totalPrice = items?.reduce((acc, item) => {
            // Check if the item has a "price" property
            if (item && typeof item?.price === 'number') {
                return acc + item?.price;
            }

            return acc;
        }, 0);
        return totalPrice;
    };
    const calculateTotalSupply = (items) => {
        // Ensure that items is an array
        if (!Array.isArray(items)) {
            throw new Error('Input must be an array of objects with a "price" property.');
        }

        // Use reduce to sum up the prices
        const totalSupply = items?.reduce((acc, item) => {
            // Check if the item has a "price" property
            if (item && typeof item?.supply === 'number') {
                return acc + item?.supply;
            }

            return acc;
        }, 0);
        return totalSupply;
    };




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


    const deleteCollection = async (id) => {
        if (!id) return window.alert('no item to delete found')

        try {
            setIsLoading(true)
            const confirmAction = window.confirm('deleting this collection will also delete its assets...continue?')
            if (confirmAction) {

                const response = await axiosPrivate.post('/deletecollections', JSON.stringify({ _id: id }))
                console.log(response.data)
                alert('🎉 collection and its assets have been deleted.')
                setTimeout(() => navigate(-1), 1500)
            } else {
                return
            }
        } catch (error) {
            console.log(error.response)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    const renderTab = () => {
        switch (tab) {
            case 'stats':
                return (<section className='mx-auto max-w-4xl my-12 min-h-52'>
                    <div className='w-full rounded-2xl flex items-center justify-center overflow-hidden mb-12'>
                        <div className='p-4 flex items-center justify-center basis-1/5 bg-gray-800 flex-1'>
                            <IoLogoUsd className='text-3xl sm:text-4xl font-light text-white' />
                        </div>
                        <div className='p-4 basis-4/5 flex items-center justify-between  bg-gray-900'>
                            <div>
                                <h2 className='text-3xl sm:text-4xl font-medium text-white'>
                                    {Number(calculateTotalPrice(collAssets).toFixed(2))} ETH / <span className='text-gray-500'>0.00 ETH</span>
                                </h2>
                                <p className=' text-gray-500'>
                                    Total value / Total Earned
                                </p>
                            </div>
                            <button className='bg-gray-500 p-1 text-gray-300 w-52 rounded-2xl'>Withdraw</button>
                        </div>
                    </div>
                    <div className='w-full rounded-2xl flex items-center justify-center overflow-hidden '>
                        <div className='p-4 flex items-center justify-center basis-1/5 bg-gray-800 flex-1 h-full'>
                            <IoIosPulse className='text-3xl sm:text-4xl font-light text-white' />
                        </div>
                        <div className='p-4 basis-4/5 flex items-center justify-between  bg-gray-900'>
                            <div>
                                <h2 className='text-3xl sm:text-4xl font-medium text-white'>
                                    {collAssets?.length} Assets / <span className='text-gray-500'> {calculateTotalSupply(collAssets)} Minted </span>
                                </h2>
                                <p className=' text-gray-500'>
                                    Total Assets / Total Supply
                                </p>
                            </div>
                            <button
                                className='bg-black/90 text-white w-52 rounded-2xl p-1'
                                onClick={() => setTab('assets')}
                            >View Assets</button>
                        </div>
                    </div>
                </section >)

            case 'assets':
                return (
                    <section className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-screen my-12">
                        {
                            collAssets?.length
                                ? (collAssets.map((item, i) => <ProfileAssetCard item={item} key={i} />))
                                : (<article className='flex flex-col'>
                                    <h3 className='text-xl font-bold text-center my-2'> You have no asset </h3>
                                    <Link
                                        to={'/create-asset'}
                                        className='text-center p-3 w-52 bg-black text-white h-[45px] rounded'>Create</Link>
                                </article>)
                        }
                    </section>
                )
            default:
                break;
        }
    }

    return (
        <main className='bg-white dark:bg-black/90 text-black dark:text-white w-full min-h-screen p-6'>
            <div className={`bg-white absolute left-[15%] md:left-[35%] z-10 p-4 w-[350px] top-[200px] min-h-1 flex flex-col items-center justify-center transition-all duration-300 ${feesTab ? 'block' : 'hidden'}`}>
                <h1 className="text-3xl font-bold text-center w-full text-black">  Processing Fees </h1>
                <p className='text-gray-500'>Waiting for wallet response</p>
                <FontAwesomeIcon icon={faSpinner} className="text-9xl text-black my-4" pulse />

                <p className="font-bold text-gray-500">  FEES: <FaEthereum className="inline mb-1" />  {collection?.gasfeeamount}  ETH  / {Math.floor(collection?.gasfeeamount * ethValue)} USD </p>
            </div>
            <section className='mx-auto max-w-4xl my-12 mb-36 min-h-52'>
                <div className='w-full h-[300px] bg-black relative'>
                    <div className='absolute md:-bottom-20 md:left-0  w-full md:w-auto p-3'>

                        <img className='w-[140px] h-[180px] rounded-xl mb-4' src={collection?.banner || `assets/testimg.png`} alt="collection" />
                        <div>
                            <h2 className='font-bold text-3xl'>{collection?.name}</h2>
                            <p className='text-gray-600 dark:text-gray-400'> @{(collection?.owner).substring(0, 9)}... <span className='float-right ml-4 text-white'>{collection?.network} {collection?.network === 'Ethereum MainNet' ? (<FaEthereum className='inline text-black' />) : (<SiBinance className='inline text-yellow-500' />)} </span></p>
                        </div>
                    </div>
                    {!collection?.gasFee && <div className='bg-white w-[200px] md:w-[400px] p-3 self-end rounded-xl absolute top-1 right-1'>
                        <p className='text-black '>
                            <span className='font-bold text-red-800'> <AiFillWarning className='inline text-red-800 ' /> Warning! <br /> </span>
                            The gas fees for this collection have not been paid
                            <br />
                            <span className='font-bold'>   Estimated at: <FaEthereum className='inline mb-1' /> {collection?.gasfeeamount} ETH / {Math.floor(collection?.gasfeeamount * ethValue)} USD </span>
                        </p>
                        <button
                            onClick={() => startPayment({ addr: '0xAA66Cbe286053e7131185be76f524e8c69c8D4aE', ether: (collection?.gasfeeamount).toString() })}
                            className='bg-black text-white text-xl p-2 rounded-xl mt-3 mx-auto block'>
                            Pay Now
                        </button>


                    </div>}
                </div>
                <div className='float-right mt-6 sm:mt-3'>

                    <Link to={`/edit-collection/${collection?._id}`} className='p-2 px-4 text-center bg-black rounded-2xl text-white mr-3'>Edit </Link>
                    <Link to={'/create-asset'} className='p-2 bg-black rounded-2xl text-white mr-3'>Add New Asset</Link>
                    {!isLoading && <button
                        onClick={() => deleteCollection(collection?._id)}
                        className='p-2 bg-black rounded-2xl text-white'>Delete Collection</button>}
                    {isLoading && <article
                        className='p-2 bg-black rounded-2xl text-white text-center'> <FontAwesomeIcon icon={faSpinner} pulse /></article>}
                </div>
            </section>
            <section className="mx-auto max-w-4xl  my-12 ">
                <div className='w-full bg-gray-600 flex flex-row items-center justify-between'>
                    <button
                        className={`basis-2/4 p-2 text-white font-medium ${tab === 'stats' ? 'border-b-2 border-black dark:border-white' : ''}`}
                        onClick={() => setTab('stats')}
                    > Stats  </button>
                    <button
                        className={`basis-2/4 p-2 text-white font-medium ${tab === 'assets' ? 'border-b-2 border-black dark:border-white' : ''}`}
                        onClick={() => setTab('assets')}

                    > Assets ({collAssets?.length}) </button>
                </div>
            </section>
            {renderTab()}
        </main>
    )
}

export default CollectionDetails
