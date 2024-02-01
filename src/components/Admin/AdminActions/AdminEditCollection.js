import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useDataContext from '../../../hooks/useDataContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faImage } from '@fortawesome/free-solid-svg-icons'
import { axiosPrivate } from '../../../api/axios'

const AdminEditCollection = () => {

    const { allCollections, isLoading, setIsLoading } = useDataContext()
    const { id } = useParams()
    const navigate = useNavigate()
    const collection = allCollections.find(col => col._id === id)


    const [name, setName] = useState(collection?.name)
    const [image, setImage] = useState('')
    const [gasfeeamount, setgasfeeamount] = useState(collection?.gasfeeamount)



    const handleImageChange = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => console.log("error :", error);

    }

    const editCollection = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            if (image) {
                const response = await axiosPrivate.patch('/admincollection', JSON.stringify({ _id: id, name: name, image: image, gasfeeamount }))
                console.log(response.data)
                alert('🎉 update successful.')
            } else {
                const response = await axiosPrivate.patch('/admincollection', JSON.stringify({ _id: id, name: name, gasfeeamount }))
                console.log(response.data)
                alert('🎉 update successful.')
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="bg-white dark:bg-black/90 flex flex-col items-center min-h-screen">
            <section className="mx-auto flex flex-col md:flex-col items-center max-w-[450px] my-12 widescreen:section-min-height tallscreen:section-min-height px-3 shadow-2xl">
                <h1 className="text-black dark:text-white text-3xl md:text-3xl font-bold my-6">Edit collection.</h1>

                <form onSubmit={editCollection} className='mx-auto bg-transparent  flex flex-col w-full max-w-[400px] p-2 items-center min-h-2'>
                    <label htmlFor="image" className="w-full text-center mb-3">

                        {!collection?.banner && !image && <FontAwesomeIcon icon={faImage} className="text-gray-400 text-[300px]" />}
                        {collection?.banner && !image && <span className="w-[300px] h-[300px] max-h-[300px]">
                            <img className="w-full h-[300px]" src={collection?.banner || ''} alt="collection banner" />
                        </span>}
                        {image && <span className="w-[300px] h-[300px] max-h-[300px]">
                            <img className="w-full h-[300px]" src={image || ''} alt="collection banner" />
                        </span>}
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        {!collection?.banner && <p className="text-black dark:text-white text-[16px] text-center font-medium">upload a picture</p>}
                        {collection?.banner && <p className="text-black dark:text-white text-[16px] text-center font-medium">Change picture</p>}
                    </label>
                    <label htmlFor="name" className="self-start text-black dark:text-white text-xl">Name: </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter the name of the collection"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <label htmlFor="gasfee" className="self-start text-black dark:text-white text-xl">Gas fee: </label>
                    <input
                        type="text"
                        id="gasfee"
                        placeholder="gas fee"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid"
                        required
                        onChange={(e) => setgasfeeamount(e.target.value)}
                        value={gasfeeamount}
                    />




                    {!isLoading &&
                        <>
                            <button
                                className=
                                "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 mt-11 mb-6">
                                Save Changes
                            </button>
                            <article
                                className=
                                "bg-gray-400  text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 mb-6 cursor-pointer"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </article>
                        </>}
                    {isLoading && <article
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </article>}

                </form>

            </section >
        </main>
    )
}

export default AdminEditCollection