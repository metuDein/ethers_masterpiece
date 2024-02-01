import useDataContext from "../../../hooks/useDataContext"
import { useNavigate } from "react-router-dom"
import ProfileAssetCard from "../AdminActions/admincard/ProfileAssetCard"

const AdminAllAsssets = () => {
    const { allAssets } = useDataContext()
    const navigate = useNavigate()
    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6'>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="dark:bg-white dark:text-black p-3 rounded"> Back </button>
            </div>
            <h2 className="mx-auto dark:text-white text-4xl font-bold w-full text-center max-w-4xl"> All Assets </h2>
            <section className="mx-auto max-w-4xl grid grid-flow-row auto-rows-auto grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 min-h-screen my-12 ">
                {
                    allAssets?.length
                        ? (allAssets?.map((item, i) => (<ProfileAssetCard item={item} key={i} />)))
                        : (<h2 className='text-3xl font-bold text-black dark:text-white'> No Assets yet. </h2>)
                }

            </section>
        </main>
    )
}

export default AdminAllAsssets