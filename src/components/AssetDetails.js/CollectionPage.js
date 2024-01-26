import React from 'react'
import useDataContext from '../../hooks/useDataContext'
import CollectionCard from './collectionCard/CollectionCard';

const CollectionPage = () => {
    const { allCollections } = useDataContext()

    return (
        <main className='bg-white dark:bg-black w-full min-h-screen p-6'>
            <section className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-screen my-12">
                {
                    allCollections?.length
                        ? (allCollections.map((item, i) => <CollectionCard item={item} key={i} />))
                        : (<h2 className='text-3xl font-bold dark:text-white'> No collections yet. </h2>)
                }
            </section>
        </main>
    )
}

export default CollectionPage