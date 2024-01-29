import { useParams, useNavigate } from "react-router-dom"
import useDataContext from "../../../hooks/useDataContext"
import { useEffect } from "react"
import { axiosPrivate } from "../../../api/axios"

const AdminViewMessage = () => {
    const { allMessages } = useDataContext()
    const { id } = useParams()
    const message = allMessages.find(msg => msg?._id === id)
    const navigate = useNavigate()

    useEffect(() => {
        const markAsRead = async () => {
            try {
                const response = await axiosPrivate.patch('/message', JSON.stringify({ _id: id }))
                console.log(response.data);
            } catch (error) {
                console.log(error.response)
            }
        }
        markAsRead()
    }, [])

    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6'>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="dark:bg-white dark:text-black p-3 rounded"> Back </button>
            </div>
            <h2 className="mx-auto dark:text-white text-4xl font-bold w-full text-center max-w-4xl"> Message from {message?.sender} </h2>

            <section className="mx-auto max-w-3xl p-3 flex flex-col">
                <div className="border dark:text-white font-bold border-solid border-gray-600 rounded-md p-2 my-1">
                    <p><span className="font-normal">FROM:</span> {message?.subject}</p>
                </div>
                <div className="border dark:text-white font-bold border-solid border-gray-600 rounded-md p-2 my-1 text-nowrap">
                    <p> <span className="font-normal">SENT TO:</span>  {message?.receiver} / (ethers masterpiece admin)</p>
                </div>
                <div className="border dark:text-white font-bold border-solid border-gray-600 rounded-md p-2 my-1 text-nowrap min-h-[400px] max-h-[600px]">
                    <p>
                        {message?.description}
                    </p>
                </div>
                <button className="dark:bg-white dark:text-black p-2 text-nowrap inline-block my-2 rounded-xl hover:bg-gray-400 transition-all duration-300">
                    Delete Message
                </button>
            </section>
        </main>
    )
}

export default AdminViewMessage