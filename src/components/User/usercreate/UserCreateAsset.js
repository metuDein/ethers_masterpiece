
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { Fragment, useState, } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import axios from '../../../api/axios'
import useDataContext from '../../../hooks/useDataContext'
import { GiPadlock } from "react-icons/gi";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const UserCreateAsset = () => {
    const { auth, isLoading, setIsLoading, allCollections } = useDataContext()

    const myColl = allCollections.filter(col => col.owner === auth?.user)

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState()
    const [supply, setSupply] = useState()
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const navigate = useNavigate()


    const [collectionName, setCollectionName] = useState('')


    const collNetwork = myColl.find(col => col.name === collectionName)



    const handleImageChange = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => console.log("error :", error);

    }

    const handleCreate = async (e) => {
        e.preventDefault()

        if (!collectionName) return alert('❌ creation failed:seem like you don\'t have a collection please create one.')
        if (!name || !image || !price || !supply || !category) return alert('❌ creation failed.')

        try {
            setIsLoading(true)
            const response = await axios.post('/assets', JSON.stringify({ name, owner: auth?.user, collectionName: collectionName, image, description, network: collNetwork?.network, supply, price, category }))
            console.log(response.data)
            alert('🎉 asset created successfully.')
            getAllAssets()
            setTimeout(() => navigate(-1), 1500)
        } catch (error) {
            setIsLoading(false)
            alert('❌ creation failed.')
            console.log(error.responseresponse)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="bg-white dark:bg-black/90 flex flex-col items-center min-h-screen">
            <section className="mx-auto flex flex-col md:flex-col items-center max-w-[600px] my-12 widescreen:section-min-height tallscreen:section-min-height px-3 shadow-2xl">
                <h1 className="text-black dark:text-white text-3xl md:text-3xl font-bold my-6 text-center">Add a New Asset to Your Collection.</h1>
                <p className="text-black dark:text-white text-xl text-center">Provide the required details for your asset.</p>
                <form onSubmit={handleCreate} className='mx-auto bg-transparent  flex flex-col w-full max-w-[500px] p-2 items-center min-h-2'>
                    <label htmlFor="image" className="w-full text-center mb-3">
                        <p className="text-black dark:text-white text-[16px] text-center m-0:">Pick a file <br /> (File types supported: JPG, PNG, GIF, SVG,  WAV, OGG, GLB, GLTF. Max size: 10 MB)</p>
                        {!image && <FontAwesomeIcon icon={faImage} className="text-gray-400 text-[300px] cursor-pointer" />}
                        {image && <span className="w-[300px] h-[300px] max-h-[300px]">
                            <img className="w-full h-[300px]" src={image || ''} alt="asset" />
                        </span>}
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            onChange={handleImageChange}
                            required
                        />
                    </label>
                    <label htmlFor="name" className="self-start text-black dark:text-white text-xl">Asset name: </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Pick a unique name for you asset"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    <label htmlFor="price" className="self-start text-black dark:text-white text-xl">price: </label>
                    <input
                        type="number"
                        id="price"
                        placeholder="set a price for this asset"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                    <label htmlFor="supply" className="self-start text-black dark:text-white text-xl">Supply: </label>
                    <input
                        type="number"
                        id="supply"
                        placeholder="total amount to be minted"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        onChange={(e) => setSupply(e.target.value)}
                        value={supply}
                        required
                    />
                    <label htmlFor="description" className="self-start text-black dark:text-white text-xl">Description: </label>
                    <textarea
                        id="description"
                        placeholder="tell us a little about your asset."
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        required
                        rows={10}
                        cols={20}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <Menu as="div" className="relative inline-block text-left dark:bg-black self-start w-full mt-3">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-[15px] font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Select a default collection
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
                            <Menu.Items className="absolute left-0 z-10 mt-2 font-medium origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
                                <div className="py-1">

                                    {
                                        myColl?.length
                                            ? (myColl.map((item, i) => (
                                                <Menu.Item key={i}>
                                                    {({ active }) => (
                                                        <article
                                                            onClick={() => setCollectionName(item?.name)}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {item?.name}
                                                        </article>
                                                    )}
                                                </Menu.Item>
                                            )))
                                            : (<h2 className='text-3xl font-bold dark:text-white'> No collections yet. </h2>)
                                    }


                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {collectionName && <p className="text-[17px] mt-1 text-black dark:text-white"><GiPadlock className="inline" /> default as {collectionName}</p>}
                    <Menu as="div" className="relative inline-block text-left dark:bg-black self-start w-full mt-3">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-[15px] font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Select a category for this asset
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
                            <Menu.Items className="absolute left-0 z-10 mt-2 font-medium origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <article
                                                onClick={() => setCategory('NFTs')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                NFTs
                                            </article>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <article
                                                onClick={() => setCategory('Digital Arts')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Digital Arts
                                            </article>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <article
                                                onClick={() => setCategory('Ai Arts')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Ai Arts
                                            </article>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {category && <p className="text-[17px] mt-1 text-black dark:text-white"><GiPadlock className="inline" /> creating as {category}</p>}


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
                        </>
                    }
                    {isLoading && <article
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6 cursor-pointer">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </article>}

                </form>
                <p className=
                    "text-black dark:text-white text-[14px] mt-4 text-center mb-3">
                    All smart contracts and contents must follow Ethers Masterpiece's <Link to={'/term-and-conditions'} className="" target='_blank' style={{ color: 'blueviolet' }}>Terms of Use</Link>, Privacy Policy and Community Guidelines.</p>

            </section>
        </main>
    )
}

export default UserCreateAsset