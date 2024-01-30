import { useParams, useNavigate } from "react-router-dom"
import useDataContext from "../../hooks/useDataContext"
import { useEffect } from "react"
import { axiosPrivate } from "../../api/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"


const UserNotfication = () => {
    const { allMessages, setIsLoading, isLoading } = useDataContext()
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

    const deleteMessage = async (id) => {
        setIsLoading(true)
        try {
            const response = await axiosPrivate.post('/deletemessage', JSON.stringify({ _id: id }))
            alert('message deleted')
            setTimeout(() => {
                navigate(-1)
            }, 1000);
        } catch (error) {
            console.log(error.response);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }


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
                    <p className="text-balance"><span className="font-normal">FROM:</span> {message?.sender}</p>
                </div>
                <div className="border dark:text-white font-bold border-solid border-gray-600 rounded-md p-2 my-1 text-nowrap">
                    <p> <span className="font-normal">SENT TO:</span>  {message?.receiver} / (ME)</p>
                </div>
                <div className="border dark:text-white font-bold border-solid border-gray-600 rounded-md p-2 my-1 text-nowrap">
                    <p className="text-balance"> <span className="font-normal">SUBJECT:</span>  {message?.subject} </p>
                </div>
                <div className="border dark:text-white font-bold border-solid border-gray-600 rounded-md p-2 my-1 text-nowrap min-h-[400px] max-h-[600px] w-full">
                    <p className="max-w-3xl text-balance">
                        {message?.description}
                    </p>
                </div>
                {!isLoading && <button
                    onClick={() => deleteMessage(id)}
                    className="dark:bg-white dark:text-black p-2 text-nowrap inline-block my-2 rounded-xl hover:bg-gray-400 transition-all duration-300">
                    Delete Message
                </button>}
                {isLoading && <article
                    className="dark:bg-white dark:text-black text-center p-2 text-nowrap inline-block my-2 rounded-xl hover:bg-gray-400 transition-all duration-300">
                    <FontAwesomeIcon icon={faSpinner} pulse />
                </article>}
            </section>
        </main>
    )
}

export default UserNotfication