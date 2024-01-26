import { useState, useEffect } from 'react'
import axios from '../../api/axios'

const Image = () => {
    const [image, setImage] = useState()
    const [AllImage, setAllImage] = useState([])
    const [deleteId, setDeleteId] = useState(null)

    useEffect(() => {
        const getImages = async () => {
            const response = await axios.get('/images')
            setAllImage(response.data.images)
        }
        getImages()
    }, [])

    const handleImageChange = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = error => console.log("error :", error);

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('/images', JSON.stringify({ banner: image }))
        console.log(response.data)
    }
    const handleDelete = async (item) => {
        await setDeleteId(item?.public_id)
        console.log(deleteId)

        try {
            const response = await axios.post('/deleteimages', JSON.stringify({ image_id: item._id, public_id: item?.public_id }))
            console.log(response.data)
        } catch (error) {
            console.log(error.response?.data)
        }

    }

    const imageComponent = () => {
        return (
            <div>
                {
                    AllImage.length ?
                        AllImage.map((image, i) => (<span key={i}>
                            <img src={image?.url} alt="imageform" className='w-[200px] h-[200px]' />
                            <button onClick={() => handleDelete(image)}>delete</button>
                        </span>)) : <p> NO Images.</p>
                }

            </div>
        )
    }

    return (
        <div>
            <form encType='multipart/form-data' onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} />
                <button className='mt-12'> Submit </button>
            </form>
            {imageComponent()}
        </div>
    )
}

export default Image