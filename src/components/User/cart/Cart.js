import React from 'react'
import useDataContext from '../../../hooks/useDataContext'
import CartCards from './CartCards'
import { IoCartOutline } from "react-icons/io5";


const Cart = () => {

    const { allCartItems, auth } = useDataContext()
    const myCartItems = allCartItems.filter((item) => item?.owner === auth?.user)


    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6'>

            <h1 className='text-4xl dark:text-white w-full  text-center'> <IoCartOutline className='inline text-5xl mr-3' /> My Cart</h1>
            <section className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-screen my-12">
                {
                    myCartItems?.length
                        ? (myCartItems.map((item, i) => <CartCards item={item} key={i} />))
                        : (<h2 className='text-3xl font-bold dark:text-white'> No items in the cart. </h2>)
                }
            </section>
        </main>
    )
}

export default Cart