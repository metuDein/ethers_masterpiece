import { Link, useNavigate } from "react-router-dom"
import useDataContext from "../../../hooks/useDataContext"

const AdminAllUSers = () => {

    const { allUsers } = useDataContext()
    const navigate = useNavigate()

    const recentUsersCard = () => {
        return allUsers.map((item, i) => (
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
    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6'>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="dark:bg-white dark:text-black p-3 rounded"> Back </button>
            </div>
            <h2 className="mx-auto dark:text-white text-4xl font-bold w-full text-center max-w-4xl"> All Users </h2>
            <section className="mx-auto max-w-4xl grid grid-flow-row auto-rows-auto grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-screen my-12 ">
                {recentUsersCard()}

            </section>
        </main>
    )
}

export default AdminAllUSers