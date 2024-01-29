import React from 'react'
import { SiBinance } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";
import axios from 'axios';
import useDataContext from '../../../hooks/useDataContext';
import { Link } from 'react-router-dom';

const CollectionCard = (item) => {

    const { allAssets, ethValue } = useDataContext()
    const itemAssets = allAssets?.filter((asset) => asset?.collectionName === item?.item?.name)

    const calculateEthValue = async (ethValue) => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: 'ethereum',
                    vs_currencies: 'usd',
                },
            })
            const ethToUsdRate = response.data.ethereum.usd;
            return ethToUsdRate * ethValue
        } catch (error) {
            console.log(error)
        }
    }


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

    const totalEth = calculateTotalPrice(itemAssets) * ethValue;

    return (
        <article className='rounded-xl col-span-1  h-[300px] w-full max-w-[250px] justify-self-center'>
            <Link
                to={`/collection/${item?.item?._id}`}
                className='flex flex-col w-full h-[100%]'>
                <div className='bg-gray-300 dark:bg-black/70 w-full basis-2/5 flex-1 pt-3'>
                    <p className='bg-black ml-2 rounded-full inline-flex px-2 py-1 text-white items-center justify-center'>
                        {item?.item?.network === 'Ethereum MainNet' && <> <FaEthereum className='inline mr-1 text-white' /> <span className='md:inline hidden'> ETH </span> </>}
                        {item?.item?.network === 'Binance Smart chain' && <> <SiBinance className='inline mr-1 text-yellow-600' /> <span className='md:inline hidden'> BNB </span> </>}
                    </p>
                </div>
                <div className='bg-gray-400 dark:bg-black/50 w-full basis-3/5 flex-1 relative'>
                    <div className='absolute top-[-50px] left-[50%] transform translate-x-[-50%]'>
                        <div className='w-[100px] h-[100px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto'>
                            {item?.item?.banner && <img style={{}} className='w-full h-full rounded-full' src={item?.item?.banner || "assets/appmainlogo.png"} alt="collection banner" />}
                        </div>
                        <h2 className='text-black dark:text-white text-xl font-bold text-center text-nowrap'>{(item?.item?.name)?.substring(0, 17)}</h2>
                        {/* <p className='text-gray-500 dark:text-gray-500 text-center'>@{item?.item?.owner}</p> */}
                    </div>
                    <div className='flex absolute bottom-0 left-0 p-3 w-full items-center justify-center'>
                        {!itemAssets?.length && <p className='inline text-center text-black dark:text-white font-bold'>
                            no assets
                        </p>}
                        {itemAssets.length && <p className='inline text-center text-black dark:text-white font-bold'>
                            Estimate: {Number(calculateTotalPrice(itemAssets).toFixed(2))} {item?.item?.network === 'Binance Smart chain' ? 'BNB' : 'ETH'} <br />${Math.floor(totalEth)}<span className='text-gray-200 text-[14px] font-normal'> USD </span>
                        </p>}
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default CollectionCard