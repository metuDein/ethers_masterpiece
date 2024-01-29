import { Link, useNavigate } from "react-router-dom"
import useDataContext from "../../../hooks/useDataContext"

const AdminAllMessages = () => {
    const navigate = useNavigate()
    const { allMessages } = useDataContext()

    const recentMessagesCard = () => {
        return (
            allMessages.map((item, i) => (
                <Link
                    to={`/admin-message/${item?._id}`}
                    key={i} className="w-full bg-white p-2 flex justify-between my-1 rounded-md">
                    <h2 className="font-bold">{item?.sender}</h2>
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-medium m-0" style={{ lineHeight: '16px' }}>{(item?.subject).substring(0, 9)}...</p>
                        <small className="text-gray-500 text-[12px]" style={{ lineHeight: '13px' }}>{(item?.description).substring(0, 12)}...</small>
                    </div>
                    <h3>2022 - 4 - 11</h3>
                </Link>
            ))
        )
    }

    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6'>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="dark:bg-white dark:text-black p-3 rounded"> Back </button>
            </div>
            <h2 className="mx-auto dark:text-white text-4xl font-bold w-full text-center max-w-4xl"> All Messages </h2>
            <section className="mx-auto max-w-4xl p-3 flex flex-col">
                {recentMessagesCard()}
            </section>
        </main>
    )
}

export default AdminAllMessages