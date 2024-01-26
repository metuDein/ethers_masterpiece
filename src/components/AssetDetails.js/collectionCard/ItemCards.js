import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SiBinance } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";
import useDataContext from '../../../hooks/useDataContext';
import { axiosPrivate } from '../../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const ItemCards = (item) => {

    const { ethValue, bnbValue, allUsers, auth, setAllCartItems, isLoading, setIsLoading } = useDataContext()
    const user = allUsers.find(uid => uid?.username === item?.item?.owner)
    const navigate = useNavigate()

    const addToCart = async () => {
        if (!user || !auth) return navigate('/user-authentication-login', { replace: true })

        try {
            setIsLoading(true)
            const response = await axiosPrivate.post('/cart', JSON.stringify({ owner: auth?.user, item: item?.item?._id }))
            console.log(response.data)
            const newItem = response.data
            setAllCartItems((prev) => {
                return [...prev, newItem]
            })
            alert('✅ Item Added.')
        } catch (error) {
            if (error.response.status === 409) alert('Item already in cart')
            console.log(error.response);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <article className='max-w-[212px] w-full max-h-[350px] min-h-[340px] h-full bg-gray-50 shadow-2xl rounded-xl relative group overflow-hidden justify-self-center'>

            <div className="w-full bg-gray-200 h-full flex flex-col justify-center items-center">

                <div className='flex-1 basis-3/5 bg-white w-full pt-1 px-1 rounded-xl overflow-hidden'>
                    <img className='rounded w-full object-cover h-full' src={item?.item?.image || "assets/testimg.png"} alt="asset main banner" />
                </div>
                <div className='flex-1 basis-2/5 w-full'>
                    <h2 className='text-center text-[17px] font-bold pt-1 text-black'> {item?.item?.name} </h2>

                    <div className='mt-3 text-black'>
                        {item?.item?.network === 'Ethereum MainNet' && <h3 className='text-center font-medium'> <FaEthereum className='inline' /> {item?.item?.price} ETH <span className='text-gray-600'> (${Math.floor(ethValue * item?.item?.price)} <small className='text-[10px]'>USD</small>) </span> </h3>}
                        {item?.item?.network === 'Binance Smart chain' && <h3 className='text-center font-medium'> <SiBinance className='inline text-yellow-500' /> {item?.item?.price} BNB <span className='text-gray-600'> (${Math.floor(bnbValue * item?.item?.price)}USD) </span> </h3>}
                    </div>
                    <div className='flex  items-center p-2 mt-2 border-t border-t-gray-400'>
                        <img className='w-[35px] h-[35px] rounded-full object-fill' src={user?.image || "assets/testimg.png"} alt="assets" />
                        <div className='ml-1'>
                            <p className='font-medium text-black'>{item?.item?.owner}</p>
                            <p className='text-gray-600 -mt-2 text-[14px]'>@{item?.item?.owner}</p>
                        </div>
                    </div>
                </div>


            </div>
            <div className='absolute  bg-black/30 w-full left-0 h-full flex flex-col items-center justify-center py-3 px-2 -bottom-[100%] group-hover:bottom-0 transition-all duration-300'>

                <div className='flex flex-row justify-between items-center space-x-2 w-full'>
                    <span className='p-2 self-start bg-gray-800 rounded-xl text-white'>
                        Likes: {item?.item?.likes}
                    </span>
                    <span className=' p-2 px-3  bg-black rounded-xl text-white'>
                        {item?.item?.category}

                    </span>
                </div>
                <div className='flex-1 flex flex-col items-center justify-center gap-3'>

                    <Link to={`/itempage/${item?.item?._id}`} className='bg-black text-white text-xl w-full p-2 text-center'>
                        View
                    </Link>
                    {!isLoading &&
                        <button
                            onClick={addToCart}
                            className='bg-black text-white text-xl w-full p-2'>
                            Add to cart
                        </button>}
                    {isLoading &&
                        <article
                            className='bg-black text-white text-xl w-52 p-2 text-center'>
                            <FontAwesomeIcon icon={faSpinner} pulse className='text-white text-2xl' />
                        </article>}


                </div>

                <span className='p-2 self-end bg-gray-800 rounded-xl text-white'>
                    Remaining : {item?.item?.supply}
                </span>
            </div>
        </article>
    )
}

export default ItemCards