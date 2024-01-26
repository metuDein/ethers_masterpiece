import { Link, } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import useDataContext from '../../hooks/useDataContext'
import ProfileCollectionCard from './usercards/ProfileCollectionCard'
import ProfileAssetCard from './usercards/ProfileAssetCard'
import { axiosPrivate } from '../../api/axios'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const UserProfile = () => {
    const [classState, setClassState] = useState('collections')
    const { allAssets, allCollections, allUsers, auth } = useDataContext();
    const assets = allAssets.filter(asset => asset.owner === auth?.user)
    const collections = allCollections.filter(col => col.owner === auth?.user)
    const user = allUsers.find(uid => uid.username === auth?.user)


    const deleteCollection = async (id) => {
        if (!id) return window.alert('no item to delete found')

        try {
            const response = await axiosPrivate('/deletecollections', JSON.stringify({ _id: id }))
            console.log(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }


    const renderTab = () => {

        switch (classState) {
            case 'collections':
                return (<section className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-screen my-12">
                    {
                        collections?.length
                            ? (collections.map((item, i) => <ProfileCollectionCard item={item} key={i} handleDelete={deleteCollection} />))
                            : (<h2 className='text-3xl font-bold dark:text-white'> you have no collection </h2>)
                    }


                </section >)
            case 'assets':
                return (
                    <section className="mx-auto max-w-4xl grid grid-cols-1 grid-flow-row sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-screen my-12">
                        {
                            assets?.length
                                ? (assets.map(item => <ProfileAssetCard item={item} key={item._id} />))
                                : (<h2 className='text-3xl font-bold dark:text-white'> you have no assets </h2>)
                        }

                    </section >
                )
            default:
                break;
        }
    }

    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6 text-black dark:text-white'>
            <section className="mx-auto max-w-4xl min-h-52 my-12">
                <div className='w-full bg-gray-500  min-h-[250px] flex flex-col justify-start items-start'>
                    <div className='w-[200px] h-[200px] overflow-hidden rounded-full py-5 flex-1'>
                        {user?.image && <img className='w-full h-[200px] object-cover rounded-full' src={user?.image || ''} alt="profile" />}
                        {!user?.image &&
                            <div className='flex items-center justify-center w-[200px] h-[200px] bg-black rounded-full'>
                                <p className='text-[50px]'>
                                    {(user?.name)?.substring(0, 1).toUpperCase()}
                                </p>
                            </div>
                        }
                    </div>
                    <div className='bg-slate-800 w-full text-white p-2 flex flex-col sm:flex-row items-center justify-between'>
                        <div className='self-start my-2 sm:my-0'>
                            <h2 className='text-3xl font-bold text-left'>
                                {user?.name}
                            </h2>
                            <p className='text-gray-500'>@{user?.username}</p>
                        </div>
                        <div className='p-3 flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-3 w-full sm:w-fit'>
                            <Menu as="div" className="relative inline text-left self-start w-full rounded-full sm:rounded-xl sm:w-68">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-[15px] font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        create
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
                                                    <Link to={'/create-collection'}

                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Collection
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to={'/create-asset'}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Asset
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <Link to={'/edit-my-profile'} className='p-2  bg-transparent border rounded-xl w-full sm:w-68 mt-2 sm:mt-0 text-center font-medium'>
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-4xl  my-12 ">
                <div className='w-full bg-gray-600 flex flex-row items-center justify-between'>
                    <button
                        className={`basis-2/4  p-2 font-medium ${classState === 'collections' ? 'border-b-2 border-black dark:border-white' : ''}`}
                        onClick={() => setClassState('collections')}
                    > Collections ({collections?.length}) </button>
                    <button
                        className={`basis-2/4 p-2 font-medium ${classState === 'assets' ? 'border-b-2 border-black dark:border-white' : ''}`}
                        onClick={() => setClassState('assets')}

                    > assets ({assets?.length}) </button>
                </div>
            </section>

            {renderTab()}
        </main>
    )
}

export default UserProfile