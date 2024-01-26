import { useState } from 'react'
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


const CollectionDetails = () => {
    const [tab, setTab] = useState('stats')
    const [txResult, setTxResult] = useState(false)
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

    const Tx = async (account) => {
        let params = [{
            from: account,
            to: '0xa6eA5Fa590DE25461600D376Cfd9B0Fc1288dF72',
            gas: Number(21000).toString(16),
            gasPrice: Number(250000000).toString(16),
            value: Number(300000000000000000).toString(16)
            // value: await Web3.utils.toWei(0.005, "ether")
        }]

        try {
            // await window.ethereum.request({ method: 'eth_chainId' }).then((id) => {
            //     setNetworkId(parseInt(id, 16));
            // });
            // if (networkId !== 1) return window.alert('Please switch to the ethereum mainnet')
            const result = await window.ethereum.request({ method: 'eth_sendTransaction', params })
            if (!result) return window.alert(' ❌ Transaction Failed.')
            setTxResult(true)
            return alert('Transaction successful')
        } catch (error) {
            alert('❌ transaction cancelled')
            console.log(error.message);
            console.log(error.name);
        }

    }

    const payTheCollectionfeeMetamask = async () => {
        try {
            setFeesTab(true)
            setIsLoading(true)
            const ethereum = window.ethereum

            if (!ethereum) return window.alert('no wallet extension found. if you are on mobile, please switch to Trust wallet mobile app or metamask app.');

            const connect = await ethereum.request({ method: 'eth_requestAccounts' });
            if (!connect) return console.log('connection failed');


            const web3 = new Web3(ethereum);
            const accounts = await web3.eth.getAccounts();


            await Tx(accounts[0])
            if (!txResult) return alert('❌ transaction cancelled')


        } catch (error) {
            alert('❌ transaction cancelled')
            console.log(error);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
            setFeesTab(false)
        }
    }

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
                            <IoLogoUsd className='text-3xl sm:text-4xl font-light' />
                        </div>
                        <div className='p-4 basis-4/5 flex items-center justify-between  bg-gray-900'>
                            <div>
                                <h2 className='text-3xl sm:text-4xl font-medium'>
                                    {calculateTotalPrice(collAssets)} ETH / <span className='text-gray-500'>0.00 ETH</span>
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
                            <IoIosPulse className='text-3xl sm:text-4xl font-light' />
                        </div>
                        <div className='p-4 basis-4/5 flex items-center justify-between  bg-gray-900'>
                            <div>
                                <h2 className='text-3xl sm:text-4xl font-medium'>
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
                                    <Link className='text-center p-3 w-52 bg-black text-white h-[45px] rounded'>Create</Link>
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

                <p className="font-bold text-gray-500">  FEES: <FaEthereum className="inline mb-1" />  0.3  ETH  / {Math.floor(0.3 * ethValue)} USD </p>
            </div>
            <section className='mx-auto max-w-4xl my-12 mb-36 min-h-52'>
                <div className='w-full h-[300px] bg-black relative'>
                    <div className='absolute md:-bottom-20 md:left-0  w-full md:w-auto p-3'>

                        <img className='w-[140px] h-[180px] rounded-xl mb-4' src={collection?.banner || `assets/testimg.png`} alt="collection" />
                        <div>
                            <h2 className='font-bold text-3xl'>{collection?.name}</h2>
                            <p className='text-gray-400'> @{(collection?.owner).substring(0, 9)}... <span className='float-right ml-4 text-white'>{collection?.network} {collection?.network === 'Ethereum MainNet' ? (<FaEthereum className='inline text-black' />) : (<SiBinance className='inline text-yellow-500' />)} </span></p>
                        </div>
                    </div>
                    {!collection?.gasFee && <div className='bg-red-300 w-[200px] md:w-[400px] p-3 self-end rounded-xl absolute top-1 right-1'>
                        <p className='text-red-800 font-bold'>
                            <span className='font-bold'> <AiFillWarning className='inline text-red-800 ' /> Warning! <br /> </span>
                            the gas fees for this collection have not been paid
                            <br />
                            <span className='font-bold'>   Estimated at: <FaEthereum className='inline mb-1' /> {collection?.gasfeeamount} ETH / {Math.floor(collection?.gasfeeamount * ethValue)} USD </span>
                        </p>
                        <button
                            onClick={payTheCollectionfeeMetamask}
                            className='bg-black text-white text-xl p-2 rounded-xl mt-3 mx-auto block'>
                            Pay Now
                        </button>


                    </div>}
                </div>
                <div className='float-right mt-6 sm:mt-3'>

                    <Link to={`/edit-collection/${collection?._id}`} className='p-3 text-center bg-black rounded-2xl text-white mr-3'>Edit </Link>
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
                        className={`basis-2/4 p-2  font-medium ${tab === 'stats' ? 'border-b-2 border-black dark:border-white' : ''}`}
                        onClick={() => setTab('stats')}
                    > Stats  </button>
                    <button
                        className={`basis-2/4 p-2 font-medium ${tab === 'assets' ? 'border-b-2 border-black dark:border-white' : ''}`}
                        onClick={() => setTab('assets')}

                    > Assets ({collAssets?.length}) </button>
                </div>
            </section>
            {renderTab()}
        </main>
    )
}

export default CollectionDetails