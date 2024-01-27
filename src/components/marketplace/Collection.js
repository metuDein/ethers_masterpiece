import React from 'react'
import { useState } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { IoLogoUsd, IoIosPulse } from "react-icons/io";
import useDataContext from '../../hooks/useDataContext';
import { useParams } from 'react-router-dom';
import { SiBinance } from 'react-icons/si';
import ItemCards from '../AssetDetails.js/collectionCard/ItemCards';


const Collection = () => {

    const [tab, setTab] = useState('stats')
    const { allAssets, allCollections } = useDataContext()
    const { id } = useParams()

    const collection = allCollections.find(col => col._id === id)
    const collAssets = allAssets.filter(asset => asset.collectionName === collection?.name)

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
                                    {calculateTotalPrice(collAssets)} ETH / <span className='text-gray-500'>0.00 ETH</span>
                                </h2>
                                <p className=' text-gray-500'>
                                    Total value / Total Earned
                                </p>
                            </div>
                            {/* <button className='bg-gray-500 p-1 text-gray-300 w-52 rounded-2xl'>Withdraw</button> */}
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
                                ? (collAssets.map((item, i) => <ItemCards item={item} key={i} />))
                                : (<article className='flex flex-col'>
                                    <h3 className='text-xl font-bold text-center my-2'> This collection has no assets yet. </h3>
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
            <section className='mx-auto max-w-4xl my-12 mb-36 min-h-52'>
                <div className='w-full h-[300px] bg-black relative'>
                    <div className='absolute md:-bottom-20 md:left-0  w-full md:w-auto p-3'>
                        <img className='w-[140px] h-[180px] rounded-xl mb-4' src={collection?.banner || `assets/testimg.png`} alt="collection" />
                        <div>
                            <h2 className='font-bold text-3xl'>{collection?.name}</h2>
                            <p className='text-gray-400'> @{(collection?.owner)?.substring(0, 9)}... <span className='float-right ml-4 text-white'>{collection?.network} {collection?.network === 'Ethereum MainNet' ? (<FaEthereum className='inline text-black' />) : (<SiBinance className='inline text-yellow-500' />)} </span></p>
                        </div>
                    </div>
                </div>
                {/* <div className='float-right mt-6 sm:mt-3'>
                    <button className='p-2 bg-black rounded-2xl text-white mr-3'>Add New Asset</button>
                    <button className='p-2 bg-black rounded-2xl text-white'>Delete Collection</button>
                </div> */}
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

export default Collection