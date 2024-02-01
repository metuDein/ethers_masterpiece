import { Link } from "react-router-dom";
import { LiaUsersCogSolid } from "react-icons/lia";
import { LuMessagesSquare, LuImagePlus } from "react-icons/lu";
import { FaFileImage, FaReplyAll, FaEthereum } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { SiBinance } from "react-icons/si";
import { GrDocumentImage } from "react-icons/gr";
import useDataContext from "../../../hooks/useDataContext";

const AdminPanel = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const { allUsers, allAssets, allCollections, allMessages, ethValue, bnbValue } = useDataContext()

    const newMsg = allMessages.filter(msg => msg.readMsg === false)
    const recentUsers = allUsers.slice(-4)

    const recentCollections = allCollections.slice(-4)
    const recentMessages = allMessages.slice(-4)
    const recentAssets = allAssets.slice(-4)

    const recentUsersCard = () => {
        return recentUsers.map((item, i) => (
            <article key={i} className='rounded-xl col-span-1  h-[300px] w-full max-w-[250px] justify-self-center'>
                <Link
                    // to={`/my-collection/${item?.item?._id}`}
                    className='flex flex-col w-full h-[100%]'>
                    <div className='bg-gray-300 dark:bg-black/80 w-full basis-2/5 flex-1 pt-3'>
                        <div className='flex flex-row justify-between w-full'>


                            <div className='flex items-center justify-between space-x-4 mr-2'>


                            </div>

                        </div>
                    </div>
                    <div className='bg-gray-400 dark:bg-black/60 w-full basis-3/5 flex-1 relative'>
                        <div className='absolute top-[-50px] left-[50%] transform translate-x-[-50%]'>
                            <div className='w-[100px] h-[100px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto'>
                                <img style={{}} className='w-full h-full rounded-full' src={item?.image} alt="collection banner" />
                            </div>
                            <h2 className='text-black dark:text-white text-xl font-bold text-center text-nowrap'>{(item?.name).substring(0, 9)}...</h2>
                            <p className='text-black dark:text-white text-center'>@{item?.username}</p>
                        </div>
                        <div className='flex absolute bottom-0 left-0 p-3 w-full items-center justify-center'>

                        </div>
                    </div>
                </Link>
            </article>
        ))
    }

    const recentCollectionCard = () => {
        return (
            recentCollections.map((item, i) => (
                <article key={i} className='rounded-xl col-span-1  h-[300px] w-full max-w-[250px] justify-self-center'>
                    <Link
                        // to={`/my-collection/${item?.item?._id}`}
                        to={`/admin-edit-collection/${item?._id}`}
                        className='flex flex-col w-full h-[100%]'>
                        <div className='bg-gray-300 dark:bg-black/80 w-full basis-2/5 flex-1 pt-3'>
                            <div className='flex flex-row justify-between w-full'>


                                <div className='flex items-center justify-between space-x-4 mr-2'>


                                </div>

                            </div>
                        </div>
                        <div className='bg-gray-400 dark:bg-black/60 w-full basis-3/5 flex-1 relative'>
                            <div className='absolute top-[-50px] left-[50%] transform translate-x-[-50%]'>
                                <div className='w-[100px] h-[100px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto'>
                                    <img style={{}} className='w-full h-full rounded-full' src={item?.banner} alt="collection banner" />
                                </div>
                                <h2 className='text-black dark:text-white text-xl font-bold text-center text-nowrap'>{(item?.name).substring(0, 10)}...</h2>
                                <p className='text-black dark:text-white text-center'>@{item?.owner}</p>
                            </div>
                            <div className='flex absolute bottom-0 left-0 p-3 w-full items-center justify-center'>
                            </div>
                        </div>
                    </Link>
                </article>
            ))
        )
    }


    const recentMessagesCard = () => {
        return (
            recentMessages.map((item, i) => (
                <Link
                    to={`/admin-message/${item?._id}`}
                    key={i} className="w-full bg-white p-2 flex justify-between my-1 rounded-md">
                    <h2 className="font-bold">{(item?.sender).substring(0, 9)}...</h2>
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-medium m-0" style={{ lineHeight: '16px' }}>{(item?.subject).substring(0, 9)}...</p>
                        <small className="text-gray-500 text-[12px]" style={{ lineHeight: '13px' }}>{(item?.description).substring(0, 12)}...</small>
                    </div>
                    <h3>2022 - 4 - 11</h3>
                </Link>
            ))
        )
    }

    const recentAssetsCard = () => {
        return (
            recentAssets.map((item, i) => (
                <article key={i} className='max-w-[212px] w-full max-h-[350px] min-h-[340px] h-full bg-gray-50 shadow-2xl rounded-xl relative group overflow-hidden justify-self-center'>

                    <div className="w-full bg-gray-200 h-full flex flex-col justify-center items-center">

                        <div className='flex-1 basis-3/5 bg-white w-full pt-1 px-1 rounded-xl overflow-hidden'>
                            <img className='rounded w-full object-cover h-full' src={item?.image} alt="asset main banner" />
                        </div>
                        <div className='flex-1 basis-2/5 w-full'>
                            <h2 className='text-center text-[17px] font-bold pt-1 text-black'> {item?.name} </h2>

                            <div className='mt-3'>
                                {item?.network === 'Ethereum MainNet' && <h3 className='text-center font-medium text-black'> <FaEthereum className='inline' /> {item?.price} ETH <span className='text-gray-600'> (${Math.floor(ethValue * item?.price)} <small className='text-[10px]'>USD</small>) </span> </h3>}
                                {item?.network === 'Binance Smart chain' && <h3 className='text-center font-medium text-black'> <SiBinance className='inline' /> {item?.price} BNB <span className='text-gray-600'> (${Math.floor(bnbValue * item?.price)}USD) </span> </h3>}

                            </div>
                            <div className='flex  items-center p-2 mt-2 border-t border-t-gray-400'>
                                <img className='w-[35px] h-[35px] rounded-full' src={"assets/testimg.png"} alt="assets" />
                                <div className='ml-1'>
                                    <p className='font-medium text-black'>{item?.owner}</p>
                                    <p className='text-gray-600 -mt-2 text-[14px]'>@{item?.owner}</p>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='absolute  bg-black/30 w-full left-0 h-full flex flex-col items-center justify-center py-3 px-2 -bottom-[100%] group-hover:bottom-0 transition-all duration-300'>
                        <div className='flex flex-row justify-between items-center space-x-2 w-full'>
                            <span className='p-2 self-start bg-gray-800 rounded-xl text-white'>
                                Likes: {item?.likes}
                            </span>
                            <span className=' p-2 px-3  bg-black rounded-xl text-white'>
                                {item?.category}

                            </span>
                        </div>
                        <div className='flex-1 flex flex-col items-center justify-center gap-3'>

                            <Link to={``} className='bg-black text-white text-xl w-full p-2 text-center'>
                                Edit
                            </Link>
                            <button
                                // onClick={() => deleteAsset(item?.item?._id)}
                                className='bg-black text-white text-xl w-full p-2'>
                                Delete
                            </button>

                        </div>

                        <span className='p-2 self-end bg-gray-800 rounded-xl text-white'>
                            Remaining : {item?.supply}
                        </span>
                    </div>
                </article>
            ))
        )
    }

    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6 relative'>
            <img className="mx-auto w-32 h-32" src="assets/appmainlogo.png" alt="app" />
            <h2 className="text-center dark:text-white text-2xl font-bold my-6"> Welcome to your Admin Panel </h2>
            <section className='max-w-4xl mx-auto flex items-center justify-around'>
                <div className="p-2">
                    <h2 className="dark:text-white font-medium text-xl"> Date: {`${hours}:${minutes}   ${year}/${month}/${day}`} </h2>
                </div>
                <div className="p-2">
                    <h2 className="dark:text-white font-medium text-xl"> New messages: {newMsg?.length}</h2>
                </div>
            </section>
            <h2 className="text-left max-w-4xl w-full mx-auto dark:text-white text-2xl font-bold my-3 mt-6"> Quick Actions </h2>

            <section className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-[50vh] my-12">
                <article className="rounded-xl bg-white col-span-1  h-[200px] w-full max-w-[250px] justify-self-center shadow-2xl">
                    <Link
                        to={`/admin-all-users`}
                        className='flex flex-col items-center justify-center w-full h-[100%]'>
                        <LiaUsersCogSolid className="text-black mx-auto text-5xl" />
                        <h3 className="font-medium">Users settings</h3>
                        <p className="text-gray-500">total users: {allUsers?.length}</p>
                    </Link>
                </article>
                <article className="rounded-xl bg-white col-span-1  h-[200px] w-full max-w-[250px] justify-self-center shadow-2xl">
                    <Link
                        to={`/admin-all-message`}
                        className='flex flex-col items-center justify-center w-full h-[100%]'>
                        <LuMessagesSquare className="text-black mx-auto text-5xl" />
                        <h3 className="font-medium">Messages</h3>
                        <p className="text-gray-500">total Messages: {allMessages?.length}</p>
                    </Link>
                </article>
                <article className="rounded-xl bg-white col-span-1  h-[200px] w-full max-w-[250px] justify-self-center shadow-2xl">
                    <Link
                        to={`/admin-all-collection`}
                        className='flex flex-col items-center justify-center w-full h-[100%]'>
                        <GrDocumentImage className="text-black mx-auto text-5xl" />
                        <h3 className="font-medium">Collections</h3>
                        <p className="text-gray-500">total collections: {allCollections?.length}</p>
                    </Link>
                </article>
                <article className="rounded-xl bg-white col-span-1  h-[200px] w-full max-w-[250px] justify-self-center shadow-2xl">
                    <Link
                        to={`/admin-all-assets`}
                        className='flex flex-col items-center justify-center w-full h-[100%]'>
                        <FaFileImage className="text-black mx-auto text-5xl" />
                        <h3 className="font-medium"> Assets</h3>
                        <p className="text-gray-500">total assets: {allAssets?.length}</p>
                    </Link>
                </article>
                <article className="rounded-xl bg-white col-span-1  h-[200px] w-full max-w-[250px] justify-self-center shadow-2xl">
                    <Link
                        to={`/admin-create-new-asset`}
                        className='flex flex-col items-center justify-center w-full h-[100%]'>
                        <LuImagePlus className="text-black mx-auto text-5xl" />
                        <h3 className="font-medium"> Create asset</h3>
                        {/* <p className="text-gray-500">total assets: {allAssets?.length}</p> */}
                    </Link>
                </article>
                <article className="rounded-xl bg-white col-span-1  h-[200px] w-full max-w-[250px] justify-self-center shadow-2xl">
                    <Link
                        to={`/admin-create-new-collection`}
                        className='flex flex-col items-center justify-center w-full h-[100%]'>
                        <HiOutlinePencilAlt className="text-black mx-auto text-5xl" />
                        <h3 className="font-medium"> Create Collection</h3>
                        {/* <p className="text-gray-500">total assets: {allAssets?.length}</p> */}
                    </Link>
                </article>
                <article className="rounded-xl bg-white col-span-1  h-[200px] w-full max-w-[250px] justify-self-center shadow-2xl">
                    <Link
                        to={`/new-outbox-message`}
                        className='flex flex-col items-center justify-center w-full h-[100%]'>
                        <FaReplyAll className="text-black mx-auto text-5xl" />
                        <h3 className="font-medium">Reply / send message(s)</h3>

                    </Link>
                </article>

            </section>
            <h2 className="text-left max-w-4xl w-full mx-auto dark:text-white text-2xl font-bold my-3 mt-6"> Recent users </h2>
            <section className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-[50vh] my-12">
                {recentUsersCard()}
            </section>


            <h2 className="text-left max-w-4xl w-full mx-auto dark:text-white text-2xl font-bold my-3 mt-6"> Recent Collections </h2>


            <section className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-[50vh] my-12">
                {recentCollectionCard()}
            </section>
            <h2 className="text-left max-w-4xl w-full mx-auto dark:text-white text-2xl font-bold my-3 mt-6"> Recent Messages </h2>

            <section className="mx-auto max-w-4xl p-3 flex flex-col">
                {recentMessagesCard()}

            </section>

            <h2 className="text-left max-w-4xl w-full mx-auto dark:text-white text-2xl font-bold my-3 mt-6"> Recent assets </h2>
            <section className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-[50vh] my-12">
                {recentAssetsCard()}
            </section>



        </main>
    )
}

export default AdminPanel