import { FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";


const Unauthorized = () => {
    return (
        <main className='bg-white dark:bg-black/90 text-black dark:text-white w-full min-h-screen p-6'>
            <section className='mx-auto p-3 md:p-0 max-w-4xl'>
                <FaBan className='my-4 text-[100px] dark:text-white font-bold' />
                <h3 className='dark:text-white text-3xl'>
                    Your are not authorized to access the page.
                    return to homepage
                </h3>
                <Link to={'/'} className='w-32 p-2 dark:bg-white dark:text-black rounded-xl my-4 block text-nowrap'>
                    Goto Homepage
                </Link>
            </section>
        </main>
    )
}

export default Unauthorized