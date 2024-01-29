

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const AdminCreateMessage = () => {
    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6 relative'>
            <h2 className="mx-auto dark:text-white text-4xl font-bold w-full text-center max-w-4xl">Reply / send a message to a user </h2>
        </main>
    )
}

export default AdminCreateMessage