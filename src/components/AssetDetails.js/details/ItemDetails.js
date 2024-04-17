import React, { useState } from 'react'
import useDataContext from '../../../hooks/useDataContext'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ItemCards from '../collectionCard/ItemCards';
import { SiBinance } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";
import { axiosPrivate } from '../../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';




const ItemDetails = () => {
    const { id } = useParams()
    const { allAssets, auth, allUsers, allLikes, isLoading, setIsLoading, setAllLikes } = useDataContext()
    const asset = allAssets.find(ast => ast._id === id)
    const [initiateTx, setInitiateTx] = useState(false)
    const user = allUsers.find(uid => uid.username === auth?.user)
    const navigate = useNavigate()
    const location = useLocation()


    const myLike = allLikes.find(like => like.owner === user?.username && like.item === id)
    // const assetLikes = allLikes.filter(like => like.item === id)
    const similarAssets = allAssets.filter(ast => ast.category === asset?.category && ast.name !== asset?.name)

    const handleInitiateTx = () => {
        if (!user || !auth) {
            navigate('/user-authentication-login', { replace: true, state: { from: location } })
        } else {
            setInitiateTx(true)
        }
    }


    const handleLike = async () => {
        if (!user || !auth) return navigate('/user-authentication-login', { replace: true })

        setIsLoading(true)
        try {
            const response = await axiosPrivate.post('/like', JSON.stringify({ owner: user?.username, item: id }))
            console.log(response.data);
            const newlike = response.data
            setAllLikes((prev) => {
                return [...prev, newlike]
            })
        } catch (error) {
            console.log(error.response)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteLike = async () => {
        setIsLoading(true)
        try {
            const response = await axiosPrivate.post('/dislike', JSON.stringify({ _id: myLike?._id, item: id }))
            console.log(response.data);
            // const newlike = response.data
            setAllLikes((prev) => {
                const newLikes = prev.filter(like => like._id !== myLike?._id)
                return newLikes
            })
        } catch (error) {
            console.log(error.response)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }


    const txTab = () => {
        return (
            <section className={`max-w-3xl bg-white absolute z-10 ${initiateTx ? 'top-[20px] md:top-[1%] ' : 'top-[-200%]'} left-[0] sm:left-[18%] p-4 sm:p-6 flex flex-col space-x-2 sm:flex-row mx-auto w-full rounded-2xl transition-all duration-500`}>
                <div className='basis-2/4 w-full h-[350px]'>
                    <img className='h-full rounded-lg' src={asset?.image} alt="txfailed" />
                </div>
                <div className='basis-2/4 w-full rounded-lg'>
                    {/* <FaTimes className='inline float-right text-3xl mt-[-50%] sm:mt-[-10px]' onClick={() => setInitiateTx(false)} /> */}
                    <h3 className='text-red-700 text-2xl font-medium text-center my-3'> Failed Transaction! </h3>
                    <p className='text-red-700 text-xl font-medium text-center underline'>Error Code #5593</p>
                    <p className='text-red-700 text-[14px] p-6 text-center'>We regret to inform you that there was a transaction error for the purchase of <span className='font-medium'>{(asset?.name)?.toUpperCase()}</span>, which may have been caused by an issue on the seller's end. Please rest assured, simply reach out to our support team and they will diligently work to resolve this matter. </p>

                    <Link
                        to={'/support-center'}
                        className='my-4 mt-2 mx-auto bg-black text-white block p-2 w-52 rounded-xl text-center hover:bg-gray-500 transition-all duration-300'> Report Issue </Link>
                    <button onClick={() => setInitiateTx(false)} className='my-4 mx-auto bg-gray-800 text-white block p-2 w-52 rounded-xl text-center mb-0  hover:bg-gray-600 transition-all duration-300'> close</button>
                </div>

            </section>
        )
    }

    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6 relative'>
            {txTab()}
            <section className='mx-auto max-w-4xl my-12'>
                <div className='flex flex-col items-center space-x-2 sm:flex-row'>
                    <div className='basis-2/4 w-full'>
                        <h2 className='text-3xl font-bold dark:text-white'># {asset?.category}</h2>
                        <img className='mb-3 w-full h-[400px] rounded-xl' src={asset?.image || "assets/testimg.png"} alt="assetpage" />
                        <div className='rounded-2xl w-full p-2'>
                            {isLoading &&
                                <FontAwesomeIcon icon={faSpinner} spinPulse className='text-2xl dark:text-white' />
                            }
                            {!myLike && !isLoading &&

                                <FaRegHeart onClick={handleLike} className='text-2xl dark:text-white  text-red-700 border border-solid p-[2px] rounded-sm cursor-pointer inline' />}
                            {myLike && !isLoading &&
                                <FaHeart
                                    onClick={deleteLike}
                                    className='text-3xl text-red-700 border border-solid p-[2px] rounded-sm cursor-pointer inline' />}

                            <span className=' dark:text-white text-black ml-4'>
                                {asset?.likes} like(s)
                            </span>
                        </div>
                    </div>
                    <div className='basis-2/4 flex flex-col flex-1 place-items-start justify-start w-full  px-3'>

                        <div className='w-full self-start'>
                            <h3 className='text-left text-4xl dark:text-white w-full my-3'>{asset?.name}</h3>
                            {asset?.network === 'Ethereum MainNet' && <h3 className='text-left text-4xl dark:text-white w-full my-5'> <FaEthereum className='inline' /> {asset?.price} ETH</h3>}
                            {asset?.network === 'Binance Smart chaine' && <h3 className='text-left text-4xl dark:text-white w-full my-5'><SiBinance className='inline text-yellow-500' /> {asset?.price} BNB</h3>}
                            <h3 className='text-left text-xl  text-gray-400  w-full mb-3'>Remaining : {asset?.supply}</h3>

                            <div className='w-full mb-4'>
                                <h3 className='font-bold text-xl text-black dark:text-white mb-1'>Descripition:</h3>
                                <div className='w-full border border-solid rounded-xl p-1 text-black dark:text-white'>
                                    <p className='text-gray-500'>From the <span className='font-bold'>#{asset?.collectionName}</span> collection.</p>
                                    <p className='text-gray-500'>owned by <span className='font-bold'>@{asset?.owner}</span></p>
                                    <p className='font-bold max-h-[100px] overflow-auto'>{asset?.description}</p>
                                </div>
                            </div>

                            <div className='flex space-x-4 px-3 my-2 w-full'>
                                {user?.username === asset?.owner && <Link to={`/edit-asset/${asset?._id}`} className='text-center w-52 bg-black shadow-2xl p-2 text-white rounded-md hover:bg-gray-600 transition duration-300'>Edit</Link>}
                                {user?.username !== asset?.owner &&
                                    <>
                                        <button className='w-52 bg-black shadow-2xl p-2 text-white rounded-md hover:bg-gray-600 transition duration-300'
                                            onClick={handleInitiateTx}
                                        >Buy Now</button>
                                        <button className='w-52 bg-black shadow-2xl p-2 text-white rounded-md hover:bg-gray-600 transition duration-300 ease-in-out'>Add to Cart</button>
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <hr className='w-full max-w-3xl bg-gray-400 mx-auto my-4' />
            <section className='mx-auto max-w-4xl my-12'>
                <h3 className='text-3xl font-bold text-center text-black dark:text-white mb-4'>Similar Assets.</h3>
                <section className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-screen my-12">
                    {
                        similarAssets?.length
                            ? (similarAssets.map((item, i) => <ItemCards item={item} key={i} />))
                            : (<h2 className='text-3xl font-bold dark:text-white'>no similar assets found. </h2>)
                    }


                </section >
            </section>

        </main>
    )
}

export default ItemDetails