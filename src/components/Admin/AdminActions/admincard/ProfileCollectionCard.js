import React from 'react'
import { SiBinance } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";
import useDataContext from '../../../../hooks/useDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { MdDeleteForever } from "react-icons/md";






const ProfileCollectionCard = (item, handleDelete) => {
    const { allAssets, isLoading, setIsLoading } = useDataContext()
    const itemAssets = allAssets?.filter((asset) => asset?.collectionName === item?.item?.name)

    const navigate = useNavigate()

    const deleteCollection = async (id) => {
        if (!id) return window.alert('no item to delete found')

        try {
            setIsLoading(true)
            const confirmAction = window.confirm('deleting this collection will also delete its assets...continue?')
            if (confirmAction) {

                const response = await axiosPrivate.post('/deletecollections', JSON.stringify({ _id: id }))
                console.log(response.data)
                alert('🎉 collection and its assets have been deleted.')
                setTimeout(() => navigate(-1), 1000)
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





    const loadingComp = () => {
        return (
            <article className='rounded-xl col-span-1  h-[300px] w-full max-w-[250px] justify-self-center flex items-center justify-center'>
                <FontAwesomeIcon icon={faSpinner} spinPulse className='text-4xl mx-auto' />
            </article>
        )
    }



    return (

        isLoading
            ? loadingComp()
            : (<article className='rounded-xl col-span-1  h-[300px] w-full max-w-[250px] justify-self-center'>
                <Link
                    to={`/admin-edit-collection/${item?.item?._id}`}
                    className='flex flex-col w-full h-[100%]'>
                    <div className='bg-gray-300 dark:bg-slate-800 w-full basis-2/5 flex-1 pt-3'>
                        <div className='flex flex-row justify-between w-full'>

                            <p className='bg-black ml-2 rounded-full inline-flex px-2 py-1 text-white items-center justify-center'>
                                {item?.item?.network === 'Ethereum MainNet' && <> <FaEthereum className='inline mr-1 text-white' /> <span className='md:inline hidden'> ETH </span> </>}
                                {item?.item?.network === 'Binance Smart chain' && <> <SiBinance className='inline mr-1 text-yellow-600' /> <span className='md:inline hidden'> BNB </span> </>}
                            </p>
                            <div className='flex items-center justify-between space-x-4 mr-2'>
                                {/* <Link to={`/edit-collection/${item?.item?._id}`}>
                                    <BsPencilSquare className='inline text-2xl' />
                                </Link> */}
                                <MdDeleteForever
                                    className='inline mr-2 text-3xl hover:transform hover:scale-[1.4] transition duration-300'
                                    onClick={() => deleteCollection(item?.item?._id)}
                                />

                            </div>

                        </div>
                    </div>
                    <div className='bg-gray-400 dark:bg-slate-500 w-full basis-3/5 flex-1 relative'>
                        <div className='absolute top-[-50px] left-[50%] transform translate-x-[-50%]'>
                            <div className='w-[100px] h-[100px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto'>
                                {item?.item?.banner && <img style={{}} className='w-full h-full rounded-full' src={item?.item?.banner || "assets/appmainlogo.png"} alt="collection banner" />}
                            </div>
                            <h2 className='text-black dark:text-white text-xl font-bold text-center text-nowrap'>{(item?.item?.name).substring(0, 17)}</h2>
                            <p className='text-black dark:text-white text-center'>@{item?.item?.owner}</p>
                        </div>
                        <div className='flex absolute bottom-0 left-0 p-3 w-full items-center justify-center'>
                            {
                                itemAssets?.length
                                    ? (<p className='font-bold'>  {itemAssets?.length} Asset(s)</p>)
                                    : (<h2 className='text-xl font-bold dark:text-white'> No assets yet. </h2>)
                            }
                        </div>
                    </div>
                </Link>
            </article>)
    )
}

export default ProfileCollectionCard