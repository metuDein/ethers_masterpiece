import React from 'react'
import { TbError404 } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Missing = () => {
    return (
        <main className='bg-white dark:bg-black/90 text-black dark:text-white w-full min-h-screen p-6'>
            <section className='mx-auto p-3 md:p-0 max-w-4xl'>
                <TbError404 className='my-4 text-[100px] dark:text-white font-bold' />
                <h3 className='dark:text-white text-3xl'>
                    The page you are looking for was not found.
                </h3>
                <Link to={'/'} className='w-32 p-2 dark:bg-white dark:text-black rounded-xl my-4 block text-nowrap'>
                    Goto Homepage
                </Link>
            </section>
        </main>
    )
}

export default Missing