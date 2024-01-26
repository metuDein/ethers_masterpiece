import React from 'react'
import useDataContext from '../../hooks/useDataContext'
import ItemCards from './collectionCard/ItemCards';



const ItemPage = () => {
    const { allAssets } = useDataContext()
    console.log(allAssets);




    return (
        <main className='bg-white dark:bg-black w-full min-h-screen p-6'>
            <section className="mx-auto max-w-4xl grid grid-flow-row auto-rows-auto grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-screen my-12 ">
                {
                    allAssets?.length
                        ? (allAssets?.map((item, i) => (<ItemCards item={item} key={i} />)))
                        : (<h2 className='text-3xl font-bold text-black dark:text-white'> No Assets yet. </h2>)
                }
            </section>
        </main>
    )
}

export default ItemPage