import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import useDataContext from '../../hooks/useDataContext'
import { axiosPrivate } from '../../api/axios'

const UserEditAsset = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { allAssets, isLoading, setIsLoading } = useDataContext()
    const asset = allAssets.find(ast => ast._id === id)


    const [image, setImage] = useState('')
    const [name, setName] = useState(asset?.name)
    const [price, setPrice] = useState(asset?.price)
    const [supply, setSupply] = useState(asset?.supply)
    const [description, setDescription] = useState(asset?.description)

    const handleImageChange = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => console.log("error :", error);

    }

    const editAsset = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            if (image) {
                const response = await axiosPrivate.patch('/assets', JSON.stringify({ _id: asset?._id, name: name, price: price, supply: supply, description: description, image: image }))
                console.log(response.data)
                alert('🎉 update successful')
            } else {
                const response = await axiosPrivate.patch('/assets', JSON.stringify({ _id: asset?._id, name: name, price: price, supply: supply, description: description }))
                console.log(response.data)
                alert('🎉 update successful')
            }

        } catch (error) {
            setIsLoading(false)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="bg-white dark:bg-black/90 flex flex-col items-center min-h-screen">
            <section className="mx-auto flex flex-col md:flex-col items-center max-w-[600px] my-12 widescreen:section-min-height tallscreen:section-min-height px-3 shadow-2xl">
                <h1 className="text-black dark:text-white text-3xl md:text-3xl font-bold my-6 text-center">Edit Asset.</h1>
                <form onSubmit={editAsset} className='mx-auto bg-transparent  flex flex-col w-full max-w-[500px] p-2 items-center min-h-2'>
                    <label htmlFor="image" className="w-full text-center mb-3">
                        {!asset?.image && !image && <FontAwesomeIcon icon={faImage} className="text-gray-400 text-[300px] cursor-pointer" />}
                        {asset?.image && !image && <span className="w-[300px] h-[300px] max-h-[300px]">
                            <img className="w-full h-[300px]" src={asset?.image || ''} alt="asset" />
                        </span>}
                        {image && <span className="w-[300px] h-[300px] max-h-[300px]">
                            <img className="w-full h-[300px]" src={image || ''} alt="asset" />
                        </span>}
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <p className="text-black dark:text-white text-[16px] text-center m-0:">Change Image. </p>
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
                                Back
                            </article>
                        </>
                    }
                    {isLoading && <article
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </article>}

                </form>

            </section>
        </main>
    )
}

export default UserEditAsset